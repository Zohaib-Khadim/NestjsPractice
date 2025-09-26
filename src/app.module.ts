import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MynameController } from './myname/myname.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductsModule } from './products/products.module';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule,
    forRoot(process.env.MONGO_URI!),
    StudentModule,
    EmployeeModule,
    ProductsModule,
    LibraryModule,
  ],
  controllers: [AppController, MynameController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
function forRoot(uri: string) {
  return MongooseModule.forRoot(uri);
}
