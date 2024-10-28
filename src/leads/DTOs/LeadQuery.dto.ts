import { IsOptional, IsString } from 'class-validator';

export class LeadQueryDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  companyName?: string; // Can be used to filter by customer’s company name
}
