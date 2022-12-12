import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
@Injectable()
export class AppService {
  userDetails:UserDto[]=[{
    username:'radhith',
    password:'password',
    isValid:false
  }]
  private user: UserDto = {
    username: '',
    password: '',
    isValid: false,
    email:''
  };

  // userService.valid = true
  set valid(flag: boolean) {
    this.user.isValid = flag;
  }
  // userService.valid
  get valid(): boolean {
    return this.user.isValid;
  }

  // userService.name = "arun"
  set name(n: string) {
    this.user.username = n;
  }
  // userService.name
  get name(): string {
    return this.user.username;
  }

    // userService.name = "arun"
    set email(n: string) {
      this.user.email = n;
    }
    // userService.name
    get email(): string {
      return this.user.email;
    }

  isUsernameValid(username: string) {
    return false;
  }


}
