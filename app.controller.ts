import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './user.dto';
import e, { Request, Response } from 'express';
import { UserValidationPipe } from './user-validation/user-validation.pipe';

@Controller()
export class AppController {
  thoughtList=[{
    userName:'David',
    thought:'cool weather',
    emailId:'david@gmail.com'
  },
  {
    userName:'John',
    thought:'enjoyin fifa world cup',
    emailId:'john@gmail.com'
  }
]
  constructor(private readonly appService: AppService) {}

  // @Get('/')
  // @Render('welcome')
  // getHello(): any {
  //   return 'helo';
  // }
  

  @Get('/signup')
  
  signuppage(@Res() res:Response): any {
    res.render('signup',{
      errorMessage:''
    })
  }

  @Get('/')

  loginpage(@Res() res:Response): any {
    res.render('login',{
      errorMessage:''
    })
  }

  @Post('/login')
  getLogin(@Body(new UserValidationPipe()) user: UserDto,@Res() res:Response) {
    console.log(user);
    console.log(this.appService.userDetails)
    let validUser=false;
    let userDet=this.appService.userDetails
    let index=this.appService.userDetails.findIndex(val=>val.username==user.username)
    if(index==-1){
      return res.render('login',{
        errorMessage:'username doesnt exists'
      })
    }else{
      if (user.password === userDet[index].password ) {
        this.appService.valid = true;
        this.appService.name = user.username;
        
        res.render('welcome',{
          username:userDet[index].username,
          thoughtList:this.thoughtList
        })
      }else{
        return res.render('login',{
          errorMessage:'username or password is not correct'
        })
      }
    }
    
    
    return { success: this.appService.valid };
  }


  @Post('/signup')
  signup(@Body(new UserValidationPipe()) user: UserDto,@Res() res:Response) {
    console.log(user);
    if(user.username==='' || user.password==='' ||user.email===''){
      return res.render('signup',{
        errorMessage:'field cannot be empty'
      })
    }
    let emailRegex=new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if(!emailRegex.test(user.email)){
      return res.render('signup',{
        errorMessage:'not a valid email id'
      })
    }
    this.appService.userDetails.push({...user})
    console.log(this.appService.userDetails)
    this.appService.valid = true;
        this.appService.name = user.username;
        this.appService.email=user.email
    res.redirect('/')
  }

  @Get('/welcome')
  
  welcomepage(@Res() res:Response): any {
    if(this.appService.valid){
      res.render('welcome',{
        username:this.appService.name,
        thoughtList:this.thoughtList
      })
    }
    else{
      throw new Error('not loggedin ')
    }
  }

  @Post('/postThought')
  postThought(@Body() data: any,@Res() res:Response) {
    console.log(data.thought)
    this.thoughtList.push({
      'userName':this.appService.name,
      'thought':data.thought,
      'emailId':this.appService.email
    })
    res.render('welcome',{
      username:this.appService.name,
      thoughtList:this.thoughtList
    })
    
  }
}
