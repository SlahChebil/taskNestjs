import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/signup')
    signUp(@Body() authCredentialDTO:AuthCredentialsDTO):Promise<void>{
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    signIn(@Body() authCredentialDTO:AuthCredentialsDTO):Promise<{ accessToken : string}>{
        return this.authService.signIn(authCredentialDTO);
    }

    @Get('/test')
    getPage(@Req() req){
        console.log(req);
    }
}
