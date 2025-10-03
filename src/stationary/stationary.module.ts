import { Module } from '@nestjs/common';
import { StationaryService } from './stationary.service';
import { StationaryResolver } from './resolvers/stationary.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Stationary, StationarySchema } from './model/statinary.model';

@Module({
  imports: [MongooseModule.forFeature([{name:Stationary.name, schema:StationarySchema}])],
  controllers: [],
  providers: [StationaryService, StationaryResolver]
})
export class StationaryModule {}
