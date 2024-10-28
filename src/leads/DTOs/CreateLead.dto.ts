import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateLeadDto {
  @IsInt()
  customerId: number;

  @IsOptional()
  @IsString()
  status?: string; // Use strings like "PENDING", "CONTACTED", etc.
}
