// work just like a controller but for GraphQL
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Stationary } from '../model/statinary.model';
import { StationaryService } from '../stationary.service';
import { CreateStationaryInput } from '../dto/create-stationary.input';
import { UpdateStationaryInput } from '../dto/update-stationary.input';

@Resolver(()=> Stationary)
export class StationaryResolver {
    constructor(private readonly stationaryService: StationaryService) {}
    @Query(() => Stationary, {name: 'getAllStationary'})
    async findAll():Promise<Stationary[]> {
        return this.stationaryService.findAll();
    }

    @Query(() => Stationary, {name: 'getStationary'})
    async findOne(@Args('id' , {type:()=>String}) id:string) {
        return this.stationaryService.findOne(id);
    }

    @Mutation(() => Stationary)
    async createStationary(@Args('input')input:CreateStationaryInput){
        return this.stationaryService.craete(input);
    }

      @Mutation(() => Stationary)
    async updateStationary(@Args('input')input:UpdateStationaryInput){
        return this.stationaryService.update(input);
    }

    @Mutation(()=> Stationary)
    async removeStationary(@Args('id', {type:()=>String}) id:string) {
        return this.stationaryService.remove(id);
    }
}

