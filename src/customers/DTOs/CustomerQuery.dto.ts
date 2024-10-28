import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CustomerQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  companyName?: string;
}
