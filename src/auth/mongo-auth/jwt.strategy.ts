import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt} from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}