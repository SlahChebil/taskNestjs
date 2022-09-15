import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Role } from "./user-role.enum";
import { User } from "./user.entity";

export const Getuser = createParamDecorator(
    (data : Role,context: ExecutionContext) : User=>{
    const req = context.switchToHttp().getRequest();
    console.log(req.user)
    return req.user;
},
);