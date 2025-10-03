import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { MongoAuthService } from './mongo-auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mongo-auth')
export class MongoAuthController {
    constructor(private readonly mongoAuthService: MongoAuthService) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        return this.mongoAuthService.register(body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.mongoAuthService.login(body.email, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
