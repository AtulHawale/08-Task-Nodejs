import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { UserDto } from '../user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class UserValidationPipe implements PipeTransform {
  

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('Reading value in transform method of pipe');
    console.log(value);
    const userInstance = plainToInstance(UserDto, value);
    console.log(userInstance);

    const errors = await validate(userInstance);
    if (errors.length > 0) {
      console.log('validation failed. errors: ', JSON.stringify(errors));
      throw new NotAcceptableException(errors);
    } else {
      console.log('validation succeed');
      return value;
    }
  }
}


