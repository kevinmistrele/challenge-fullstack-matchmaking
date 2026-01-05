# 🎮 Desafio Full Stack — Sistema de Pareamento de Jogadores (Matchmaking)

## 🎯 Objetivo
Criar um **sistema de pareamento de jogadores** para **League of Legends** e **Valorant**, permitindo que usuários se cadastrem, façam login social, entrem em uma **fila de matchmaking** e sejam pareados com outros jogadores compatíveis.

O foco do desafio é **arquitetura, qualidade de código, Clean Code, SOLID e POO**, e não apenas a entrega visual.

---

## 🧱 Requisitos Técnicos Obrigatórios

### Gerais
- Frontend em **React**
- Backend **à escolha do candidato**
- **Docker** para frontend
- **Docker** para backend
- **Sistema de fila obrigatório**
- **Redux** (preferencialmente Redux Toolkit)
- **shadcn/ui**
- **Testes unitários**
- **Documentação da API**
- Aplicar **Clean Code + SOLID + POO**

---

## 🔐 Funcionalidades

### 1️⃣ Autenticação
- Login Social (mínimo 1):
  - Google **ou**
  - Discord
- Persistência de sessão (JWT, cookie ou similar)

---

### 2️⃣ Cadastro do Jogador
O sistema deve permitir o cadastro com os seguintes dados:

- Nome
- Nickname
- Jogo:
  - League of Legends
  - Valorant
- Região (ex: BR, NA, EU)
- Função / Role  
  - LoL: Top, Jungle, Mid, ADC, Support  
  - Valorant: Duelist, Controller, Initiator, Sentinel
- Rank
- Preferência de comunicação:
  - Texto
  - Voz
- Integração com Discord:
  - ID do usuário
  - Avatar (opcional)

---

### 3️⃣ Sistema de Fila (Matchmaking)

O jogador pode:
- Entrar na fila
- Sair da fila
- Consultar status da fila

#### Regras mínimas de pareamento
- Mesmo jogo
- Mesma região
- Rank compatível (diferença máxima configurável)
- Não parear o jogador consigo mesmo

⚠️ **Obrigatório uso de fila real**, não pode ser apenas lógica síncrona.

Soluções aceitas:
- Redis (BullMQ, BeeQueue)
- RabbitMQ
- SQS
- Kafka (simplificado)

---

### 4️⃣ Pareamento
Quando um match for encontrado:
- Criar um **Match**
- Registrar histórico
- Notificar os jogadores (API, WebSocket ou mock)

---

### 5️⃣ Integração com Discord
- Associar conta Discord
- Simular envio de mensagem:
  > “🎮 Match encontrado! Boa sorte!”

(Mock é aceitável)

---

## 🖥️ Frontend (React)

### Stack mínima
- React
- Redux
- shadcn/ui
- React Router
- Testes com:
  - Jest **ou**
  - Vitest + Testing Library

### Telas mínimas
1. Login
2. Cadastro
3. Dashboard do jogador
4. Tela de fila
5. Tela de match encontrado

### Requisitos
- Redux organizado por domínio
- Componentes desacoplados
- Uso correto de hooks
- Tratamento de loading e erro
- UI simples (visual não é foco)

---

## ⚙️ Backend

### Linguagem / Framework
Livre escolha, exemplos:
- Node.js (NestJS, Express, Fastify)
- Java (Spring Boot)
- .NET
- Go

### Requisitos
- Arquitetura em camadas:
  - Controller
  - Service / Use Case
  - Domain
  - Repository
- Aplicação de SOLID
- POO real (entidades, serviços de domínio)
- DTOs claros
- Validação de dados
- Testes unitários (mínimo nos serviços)

---

## 📚 Documentação da API

Obrigatório:
- Swagger / OpenAPI  
  **ou**
- Postman Collection documentada

Endpoints mínimos:
- Autenticação
- Cadastro
- Entrar na fila
- Sair da fila
- Status da fila
- Match encontrado

---

## 🧪 Testes Unitários

Obrigatório:
- 1 teste de lógica de pareamento
- 1 teste do serviço de fila
- 1 teste de reducer Redux
- Mocks para dependências externas

---

## 🐳 Docker

Obrigatório:
- `Dockerfile` para frontend
- `Dockerfile` para backend
- `docker-compose.yml` contendo:
  - Frontend
  - Backend
  - Sistema de fila (ex: Redis)

---

## 📂 Estrutura Sugerida

### Backend
```
src/
├── domain/
│ ├── entities/
│ ├── value-objects/
│ └── services/
├── application/
│ ├── use-cases/
│ └── dtos/
├── infrastructure/
│ ├── http/
│ ├── queue/
│ └── repositories/
├── tests/

---
```


## 🧠 Critérios de Avaliação

| Critério | Peso |
|--------|------|
| Arquitetura | ⭐⭐⭐⭐⭐ |
| Clean Code | ⭐⭐⭐⭐⭐ |
| Uso de Redux | ⭐⭐⭐⭐ |
| Sistema de fila | ⭐⭐⭐⭐ |
| Testes | ⭐⭐⭐⭐ |
| Documentação | ⭐⭐⭐ |
| UI | ⭐⭐ |

---

## 🎁 Diferenciais (Opcional)
- WebSocket para notificações em tempo real
- Configuração dinâmica de rank
- Retry automático na fila
- Logs estruturados
