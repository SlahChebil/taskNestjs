import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";
export class GetTasksilterDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    search?:string;
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;
}