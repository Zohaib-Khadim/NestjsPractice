import { Injectable , OnModuleInit , OnApplicationShutdown} from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected = false

    onModuleInit() {
        this.isConnected = true;
        console.log('Database connected');
    }
    onApplicationShutdown(signal: string) {
        this.isConnected = false;
        console.log('Database disconnected due to signal:', signal);
    }

    getStatus() {
        return this.isConnected ? 'Connected' : 'Disconnected';
    }
}
