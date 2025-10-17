import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { NodeEnvEnum } from 'src/enum/node-env.enum';

export class EnvironmentVariables {
  // App
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNumber()
  APP_PORT: number;

  // Database
  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  // Redis
  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  // Resend
  @IsString()
  @IsNotEmpty()
  RESEND_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  RESEND_EMAIL_FROM: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig);

  if (errors.length > 0) {
    console.error('❌ Invalid environment variables:\n', errors);
    throw new Error(errors.toString());
  }

  return validateConfig;
}
