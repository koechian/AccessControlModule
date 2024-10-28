import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateInteractionDto {
  @IsInt()
  leadId: number;

  @IsString()
  type: string; // Use strings like "PHONE_CALL", "EMAIL", etc.

  @IsOptional()
  @IsString()
  details?: string;
}
