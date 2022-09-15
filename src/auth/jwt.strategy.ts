import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRespository } from "./users.repository";
import { JwtPayload } from './jwt-paload.interface';
import { User } from "./user.entity";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRespository)
        private userRepository:UsersRespository
    ){
        super({
            secretOrKey : 'topSecret51',
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload):Promise<any>{
        const {username}= payload;
        const user = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }else{
            return user;
        }
    }
}