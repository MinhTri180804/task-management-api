import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { NodeEnvEnum } from 'src/core/enum/node-env.enum';

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

  // Secret Keys
  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_INIT_PROFILE_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_SET_PASSWORD_SECRET: string;

  // Expires In
  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  JWT_INIT_PROFILE_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  JWT_SET_PASSWORD_EXPIRES_IN: string;

  // Redirect to
  @IsString()
  @IsNotEmpty()
  CREATE_PROFILE_REDIRECT_TO: string;
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
