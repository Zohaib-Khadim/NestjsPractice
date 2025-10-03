import { InputType , Field } from "@nestjs/graphql";
import { IsNotEmpty , IsString } from  'class-validator'

@InputType()
export class CreateStationaryInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field({nullable: true})
    @IsString()
    description?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    author: string;

}