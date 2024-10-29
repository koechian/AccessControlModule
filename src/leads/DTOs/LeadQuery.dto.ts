import { IsOptional, IsString } from 'class-validator';

export class LeadQueryDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  customerName?: string;
  @IsOptional()
  @IsString()
  customerEmail?: string;
}
