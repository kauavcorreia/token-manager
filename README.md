# 🏥 Sistema de Gerenciamento de Filas e Chamados - Laboratório Médico

Um sistema acadêmico de gerenciamento de filas para laboratórios médicos, desenvolvido com **NestJS**, **React**, **TypeScript**, **MySQL**, **Prisma** e **WebSockets**.

## 🎯 Características

- ✅ **Emissão de Senhas**: Totem com 3 categorias (SP, SE, SG)
- ✅ **Atendimento em Tempo Real**: Guichês com algoritmo de alternância de prioridades
- ✅ **Painel Dinâmico**: Display das últimas 5 senhas chamadas com alerta sonoro
- ✅ **Cálculo de Tempos**: Simulação realista de tempos de atendimento
- ✅ **Desistências**: Simulação de 5% de no-show automático
- ✅ **Relatórios**: Diários, mensais e auditoria completa
- ✅ **Horário de Funcionamento**: Restrito a 07:00-17:00
- ✅ **WebSockets**: Comunicação em tempo real entre componentes

## 🏗️ Arquitetura

```
token-manager/
├── backend/          # NestJS + TypeScript + Prisma
├── frontend/         # React + TypeScript + TailwindCSS
└── docker-compose.yml
```

## 📋 Requisitos

- Node.js 18+
- Docker & Docker Compose
- npm ou yarn

## 🚀 Como Iniciar

### 1. Clonar o Repositório
```bash
git clone <repositorio>
cd token-manager
```

### 2. Configurar Backend
```bash
cd backend
npm install
cp .env.example .env
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
```

### 4. Iniciar com Docker Compose
```bash
docker-compose up
```

Isto irá:
- Iniciar MySQL 8.0
- Executar migrations Prisma
- Iniciar o backend NestJS em http://localhost:3001
- Logs disponíveis para acompanhar a inicialização

### 5. Iniciar Frontend (em outro terminal)
```bash
cd frontend
npm run dev
```

Frontend estará em http://localhost:3000

## 🎮 Interfaces

### 🎫 Totem (`/totem`)
- Escolher tipo de senha (SP/SE/SG)
- Emitir nova senha
- Exibir senha gerada

### 👨‍💼 Guichê (`/guiche/:id`)
- Botão "Chamar Próximo"
- Exibir tempo de atendimento estimado
- Botão "Finalizar Atendimento"

### 📺 Painel (`/painel`)
- Últimas 5 senhas chamadas
- Alerta sonoro quando nova senha é chamada
- Identificação de guichê

## 🔌 APIs

### Tickets
- `POST /api/tickets` - Gerar nova senha
- `GET /api/tickets` - Listar senhas (com filtros)

### Guichês
- `POST /api/guiche/chamar-proximo` - Chamar próxima senha
- `POST /api/guiche/finalizar` - Finalizar atendimento
- `GET /api/guiche/:id` - Dados do guichê

### Relatórios
- `GET /api/relatorios/diario` - Relatório do dia
- `GET /api/relatorios/mensal` - Relatório mensal
- `GET /api/relatorios/auditoria` - Auditoria completa

## 📊 Banco de Dados

Prisma gerencia as seguintes tabelas:
- **Ticket** - Senhas emitidas
- **Guiche** - Guichês e status
- **LogAtendimento** - Histórico de atendimentos

## 🎨 Stack Tecnológica

### Backend
- NestJS 10+
- TypeScript 5+
- Prisma ORM
- MySQL 8.0
- Socket.io
- Express + CORS

### Frontend
- React 18+
- TypeScript 5+
- Vite
- TailwindCSS
- Socket.io-client
- React Router
- Axios

## 📝 Regras de Negócio

1. **Horário**: 07:00-17:00 (fora desse horário: sem emissão)
2. **Desistência**: 5% das senhas não comparecem automaticamente
3. **Algoritmo de Fila**: [SP] → [SE|SG] → [SP] → ...
4. **Tempo de Atendimento**:
   - SP: 15 ± 5 min
   - SE: 1 min (95%) ou 5 min (5%)
   - SG: 5 ± 3 min

## 📁 Estrutura de Pastas

Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes completos da estrutura modular.

## 🛠️ Desenvolvimento

### Adicionar Nova Feature

1. Criar arquivo em `backend/src/modules/feature/`
2. Implementar controller, service, repository, dto
3. Registrar no módulo
4. Criar componente/page em `frontend/src/pages/Feature/`

### Executar Testes
```bash
cd backend
npm run test
```

### Verificar Lint
```bash
npm run lint
```

## 🐛 Troubleshooting

### MySQL não conecta
```bash
docker-compose down
docker-compose up --build
```

### Limpar dados e recomeçar
```bash
cd backend
npx prisma migrate reset
```

## 📚 Documentação Adicional

- [Swagger/OpenAPI](http://localhost:3001/api) - API docs
- `.env.example` - Variáveis de ambiente

## 👨‍💻 Autor

Projeto Acadêmico - 2026

## 📄 Licença

MIT
