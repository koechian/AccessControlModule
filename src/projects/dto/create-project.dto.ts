import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UUID } from 'crypto';

// Custom class to check weather Asignee is populated when isAssigned is True

// class IsAssignedRequiredConstraint implements ValidatorConstraintInterface {
//   validate(Asignee: UUID, args: ValidationArguments) {
//     // Takes in the argument object as a CreateUserDto
//     const obj = args.object as CreateProjectDto;

//     // return false if isAssigned is false or if isAssigned is true and the Asignee UUID is undefined

//     return !obj.isAssigned || (obj.isAssigned && Asignee !== undefined);
//   }

//   defaultMessage(args?: ValidationArguments) {
//     return 'Asignee must be populated if the Project has been Assigned';
//   }
// }

enum Status {
  ongoing,
  paused,
  completed,
}

export class CreateProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  projectedCost: number;

  @IsNotEmpty()
  clientName: string;

  @IsOptional()
  @IsBoolean()
  isAssigned: boolean;

  // @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  // @IsDate()
  endDate: Date;

  status: string;
}
