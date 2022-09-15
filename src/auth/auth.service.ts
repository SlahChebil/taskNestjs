import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';
import { UsersRespository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-paload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRespository)
        private usersRepository:UsersRespository,
        private JwtService:JwtService){}
        
    async signUp(authcreadentialsUser:AuthCredentialsDTO): Promise<void>{
        return this.usersRepository.createUser(authcreadentialsUser);
    }


    async signIn(authcreadentialsUser:AuthCredentialsDTO): Promise<{accessToken:string}>{
        const {username,password} = authcreadentialsUser;
        const user = await this.usersRepository.findOne({username});

        if(user && (await bcrypt.compare(password, user.password))){
            const payload : JwtPayload={username};
            const accessToken= this.JwtService.sign(payload);
            console.log(accessToken);
            return {accessToken};
        }else{
            throw new UnauthorizedException('check username & password credentials');
        }
    }
}
