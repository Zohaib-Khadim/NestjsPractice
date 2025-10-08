import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MynameController } from './myname/myname.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductsModule } from './products/products.module';
import { LibraryModule } from './library/library.module';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoAuthModule } from './auth/mongo-auth/mongo-auth.module';
import { StationaryModule } from './stationary/stationary.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers:[
        {
          name:"default",
          ttl:seconds(60),
          limit:3
        }
      ],
      errorMessage:"Too many requests, please wait a minute and try again later."
    }),
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:join(process.cwd(),'src/schema.gql'),
      sortSchema:true,
      playground:true,
    }),
    // MongooseModule,
    // forRoot(process.env.MONGO_URI!),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URI,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    EmployeeModule,
    ProductsModule,
    LibraryModule,
    TeacherModule,
    MongoAuthModule,
    StationaryModule,
    PrismaModule,
    BookModule,
  ],
  controllers: [AppController, MynameController],
  providers: [AppService, DatabaseService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
// function forRoot(uri: string) {
//   return MongooseModule.forRoot(uri);
// }
