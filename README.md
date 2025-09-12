# PC Ideal - Sistema de Recomendação de PC

Uma aplicação web em React + TypeScript para recomendação personalizada de componentes de PC, com interface administrativa e sistema de autenticação.

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`

## 🔧 Configuração

### Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

- **VITE_API_URL**: URL da API backend. Se deixado vazio, a aplicação usará dados mock para demonstração.

### Modo Mock vs Backend Real

**Modo Mock (padrão):**
- Deixe `VITE_API_URL` vazio no arquivo `.env`
- Dados de demonstração inclusos
- Usuários de teste:
  - Admin: `admin@ideal.com` / `123456`
  - Usuário: `user@ideal.com` / `123456`

**Backend Real:**
- Configure `VITE_API_URL` com a URL da sua API
- Implemente os endpoints listados abaixo

## 📱 Funcionalidades

### Páginas Públicas
- **Home** (`/`): Landing page com call-to-action
- **Login** (`/login`): Autenticação de usuários
- **Register** (`/register`): Cadastro de novos usuários
- **Questionário** (`/questionario`): Coleta de requisitos (propósito e orçamento)
- **Motivos** (`/motivos`): Explicação das recomendações
- **Peças** (`/pecas`): Detalhamento de componentes e preços

### Páginas Protegidas
- **Minhas Builds** (`/minhas-builds`): Builds salvas pelo usuário
- **Admin Usuários** (`/admin/usuarios`): Gerenciamento de usuários (apenas ADMIN)

## 🛠 Endpoints da API

### Autenticação
```
POST /api/auth/login
POST /api/auth/register
```

### Recomendações
```
POST /api/recommendations
```

### Usuários (Admin)
```
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
```

### Builds
```
GET /api/builds (builds do usuário logado)
POST /api/builds
```

## 🎨 Stack Tecnológica

- **Frontend**: React 18 + TypeScript
- **Roteamento**: React Router 6
- **Estilização**: Tailwind CSS + shadcn/ui
- **Formulários**: React Hook Form + Zod
- **Estado**: React Query
- **Build**: Vite

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── Navbar.tsx      # Navegação principal
│   └── FormCard.tsx    # Card para formulários
├── context/            # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/              # Hooks customizados
├── pages/              # Páginas da aplicação
├── routes/             # Proteção de rotas
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
└── App.tsx            # Componente principal
```

## 🔐 Sistema de Autenticação

- **JWT**: Tokens armazenados no localStorage
- **Roles**: USER | ADMIN
- **Proteção**: Rotas protegidas por login e role
- **Redirecionamento**: Automático para login quando necessário

## 🎯 Fluxo da Aplicação

1. **Usuário acessa** → Home page com CTA "Montar PC"
2. **Questionário** → Seleciona propósito (gaming/work/study) e orçamento
3. **Recomendação** → API gera build personalizada
4. **Motivos** → Explicação das escolhas
5. **Peças** → Lista detalhada com preços
6. **Salvar** → Login necessário para persistir builds

## 📊 Dados Mock

### Usuários de Teste
- **Admin**: admin@ideal.com / 123456
- **User**: user@ideal.com / 123456

### Builds de Exemplo
- Gaming econômica (~R$ 3.200)
- Gaming extrema (~R$ 12.000)
- Builds de trabalho e estudo

## 🚀 Deploy

Para produção, configure:

1. `VITE_API_URL` com sua API real
2. Build: `npm run build`
3. Deploy dos arquivos da pasta `dist/`

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes.