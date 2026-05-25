import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      
      // Configurações do JWT usando valores do ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'default_jwt_secret',
        signOptions: {
          expiresIn: configService.getNumber('JWT_EXPIRES_IN') || 3600, // 1 hora
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}


