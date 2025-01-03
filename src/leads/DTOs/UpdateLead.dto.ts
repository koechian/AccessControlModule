import { IsOptional, IsString } from 'class-validator';

export class UpdateLeadDto {
  id: number;

  @IsOptional()
  @IsString()
  status?: string; // Use strings like "PENDING", "CONTACTED", etc.
}
