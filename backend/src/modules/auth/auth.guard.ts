import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: unknown;
}

// Guarda de autenticação que valida tokens JWT
// Uso: @UseGuards(AuthGuard) em controllers ou rotas específicas para proteger endpoints que requerem autenticação

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    
    // Extrai o token do header Authorization (formato: "Bearer <token>")
    const token = this.extractTokenFromHeader(request);

    // Se não houver token, lança exceção 401
    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    // Valida o token com JwtService
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } 
    catch (error) {
      // Se o token for inválido ou expirado, lança exceção 401
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  // Método auxiliar para extrair o token do header Authorization
  private extractTokenFromHeader(request: AuthenticatedRequest): string | undefined {
    const authHeader = request.headers.authorization;
    
    // Verifica se o header existe
    if (!authHeader) {
      return undefined;
    }

    // Separa o tipo (Bearer) do token
    const [type, token] = authHeader.split(' ');
    
    // Retorna apenas se o tipo for "Bearer"
    return type === 'Bearer' ? token : undefined;
  }
}
