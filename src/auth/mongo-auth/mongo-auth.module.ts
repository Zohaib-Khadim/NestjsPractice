import { Module } from '@nestjs/common';
import { MongoAuthController } from './mongo-auth.controller';
import { MongoAuthService } from './mongo-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './worker.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [ConfigModule,MongooseModule.forFeature([{name:Worker.name, schema:WorkerSchema}]),JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT Secret inside factory:', secret); // 👈 Add this line here

        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
  })],
  controllers: [MongoAuthController],
  providers: [MongoAuthService, JWTStrategy]
})
export class MongoAuthModule {}
