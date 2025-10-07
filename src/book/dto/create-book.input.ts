import { InputType , Field } from "@nestjs/graphql";
import { IsNotEmpty , IsString } from  'class-validator'

@InputType()    
export class CreateBookInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    author: string;
}