import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Book {
    @Field()
    id: string;
    
    @Field()
    title: string;

    @Field({nullable: true})
    description?: string;

    @Field()
    author: string;

    @Field()
    createdAt: Date;
}