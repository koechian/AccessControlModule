import { IsOptional, IsString } from 'class-validator';

export class UpdateInteractionDto {
  @IsOptional()
  @IsString()
  type?: string; // Use strings like "PHONE_CALL", "EMAIL", etc.

  @IsOptional()
  @IsString()
  details?: string;
}
