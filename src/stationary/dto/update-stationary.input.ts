import { CreateStationaryInput } from "./create-stationary.input";
import { InputType , Field, PartialType, ID} from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateStationaryInput extends PartialType(CreateStationaryInput) {
    @Field(() => ID)
    @IsNotEmpty()
    id: string;
}