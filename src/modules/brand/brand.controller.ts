import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { AccessTokenGuard } from '@shared/guard/access-token.guard';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';
import { ResponseSuccessStatus } from '@shared/decorators/response-success-status.decorator';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { Types } from 'mongoose';

@Controller('brands')
export class BrandController {
  constructor(private readonly _brandService: BrandService) {}

  @Get('')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Get all brands successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  async findAll() {
    return await this._brandService.findAll();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Get brand successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  async findById(@Param('id') brandId: string) {
    return await this._brandService.findById({ brandId });
  }

  @Post('create')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Create brand successfully')
  @ResponseSuccessStatus(HttpStatus.CREATED)
  async create(@CurrentUser('sub') userId: string, @Body() data: CreateDTO) {
    const { name, description } = data;
    return await this._brandService.create({
      name,
      description,
      createdBy: new Types.ObjectId(userId),
    });
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Delete brand successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  async delete(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return await this._brandService.softRemove({
      id,
      userId: new Types.ObjectId(userId),
    });
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Updated brand successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  async update(@Param('id') brandId: string, @Body() data: UpdateDTO) {
    const { name, description } = data;
    const brand = await this._brandService.update(brandId, {
      name,
      description,
    });

    return brand;
  }
}
