import {
  IsOptional,
  IsNumber,
  IsInt,
  IsString,
  Min,
  Max,
  IsEmail,Matches
} from 'class-validator';

export class UserDto {
  @Matches((/[a-zA-Z]/))
  username: string;
  password: string;
  isValid: boolean;
  @IsEmail()
  @IsOptional()
  email?:string;
}


// import {
//   IsOptional,
//   IsNumber,
//   IsInt,
//   IsString,
//   Min,
//   Max,
// } from 'class-validator';

// export class Movie {
//   @IsInt()
//   @IsOptional()
//   id: number;

//   @IsString()
//   title: string;

//   // @IsInt() // integers
//   @IsNumber() // floating number
//   @Min(0)
//   @Max(5)
//   rating: number;
// }

