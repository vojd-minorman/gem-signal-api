import { IsNotEmpty, IsString } from 'class-validator';

export class MessageRequest {
    @IsNotEmpty()
    @IsString()
    message: string = '';
}
