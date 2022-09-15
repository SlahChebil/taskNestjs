import {createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Role } from "./user-role.enum";
import { User } from "./user.entity";


export const ROLES_KEY = 'roles';
export const Roles = createParamDecorator(
    (data : Role,context: ExecutionContext) : boolean=>{
        const req = context.switchToHttp().getRequest();
        if(req.user.role==data){
            return true;
        }
        return false;
    },
);