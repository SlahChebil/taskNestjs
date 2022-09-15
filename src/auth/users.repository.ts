import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credential.dto";
import * as bcrypt from'bcrypt';
import { User } from "./user.entity";
import { Role } from "./user-role.enum";

@EntityRepository(User)
export class UsersRespository extends Repository<User>{
    async createUser (authCredentialDTO:AuthCredentialsDTO): Promise<void> {
        const {username,password}=authCredentialDTO;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        //
        console.log(salt);
        console.log(hashedPassword);
        const user=this.create({
            username,
            password:hashedPassword,
            role:Role.collaborater
        });
        try{
            await this.save(user);

        }catch(e){
            if(e.code === '23505'){
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}