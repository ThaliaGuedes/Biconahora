# FreelaJá - Integração Front-end + Backend

## 📋 Visão Geral

Este front-end React está completamente integrado para conectar com um backend Django. Todas as funcionalidades estão prontas para funcionarem com APIs reais.

## 🔧 O que foi implementado

### ✅ Serviços de API
- **auth.service.ts** - Login, registro e autenticação JWT
- **freelancer.service.ts** - CRUD de freelancers
- **employer.service.ts** - CRUD de employers  
- **connection.service.ts** - Criação e gestão de conexões
- **message.service.ts** - Envio e recebimento de mensagens
- **websocket.service.ts** - Chat em tempo real via WebSocket

### ✅ Funcionalidades Integradas
- ✅ Login/Registro real com autenticação JWT
- ✅ Busca de freelancers do banco de dados
- ✅ Filtros por cidade e habilidades
- ✅ Criação de conexões diretas (sem aprovação)
- ✅ Chat em tempo real via WebSocket
- ✅ Edição de perfil com upload de fotos
- ✅ Persistência automática de token
- ✅ Interceptors para renovação de token
- ✅ Estados de loading e feedback visual
- ✅ Tratamento de erros com toasts

## 🚀 Como Rodar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Backend Django URL
VITE_API_URL=http://localhost:8000/api

# WebSocket URL  
VITE_WS_URL=ws://localhost:8000
```

### 2. Instalar Dependências

```bash
npm install
# ou
pnpm install
```

### 3. Rodar o Front-end

```bash
npm run dev
# ou
pnpm run dev
```

O front-end estará rodando em `http://localhost:5173`

### 4. Backend Django (Necessário)

**IMPORTANTE:** O front-end precisa do backend rodando para funcionar completamente.

Use o prompt fornecido para criar o backend Django, ou certifique-se de que o backend esteja rodando em `http://localhost:8000`

#### Endpoints Esperados pelo Front-end:

```
POST   /api/auth/login/
POST   /api/auth/register/freelancer/
POST   /api/auth/register/employer/
GET    /api/auth/me/

GET    /api/freelancers/
GET    /api/freelancers/:id/
PATCH  /api/freelancers/:id/

GET    /api/employers/
GET    /api/employers/:id/
PATCH  /api/employers/:id/

POST   /api/connections/
GET    /api/connections/

POST   /api/messages/
GET    /api/messages/

WS     /ws/chat/:connectionId/?token=:jwt
```

## 📡 Fluxo de Autenticação

1. Usuário preenche formulário de login/registro
2. Front-end envia credenciais para `/api/auth/login/` ou `/api/auth/register/`
3. Backend retorna token JWT + dados do perfil
4. Token é salvo no localStorage
5. Todas as requisições seguintes incluem o token no header `Authorization: Bearer <token>`
6. Se token expirar (401), usuário é redirecionado para login

## 💬 Chat em Tempo Real

### Como funciona:

1. **Employer** clica em "Enviar Mensagem"
2. Sistema cria conexão via `POST /api/connections/`
3. Sistema abre aba de mensagens
4. WebSocket conecta em `/ws/chat/<connection_id>/?token=<jwt>`
5. Mensagens são enviadas/recebidas em tempo real
6. **Freelancer** vê a mensagem instantaneamente

### Formato de Mensagem WebSocket:

```javascript
// Cliente envia:
{
  "type": "chat_message",
  "message": "Olá!",
  "sender_id": "uuid-do-sender"
}

// Servidor broadcast:
{
  "type": "chat_message",
  "message_id": "uuid",
  "message": "Olá!",
  "sender_id": "uuid-do-sender",
  "timestamp": "2026-02-22T15:30:00Z"
}
```

## 🔐 Segurança

- ✅ Tokens JWT armazenados em localStorage
- ✅ Interceptor automático adiciona token em requisições
- ✅ Logout limpa todos os dados
- ✅ Redirect automático se não autenticado
- ✅ CORS precisa estar configurado no backend

## 🎨 Cores do Branding

- **Roxo Principal:** `#7C3AED` (purple-600)
- **Amarelo Bebê:** `#FEF3C7` (yellow-50)
- **Gradiente:** `from-purple-50 to-yellow-50`

## 📦 Dependências Principais

- **axios** - Cliente HTTP
- **react-router-dom** - Roteamento
- **sonner** - Notificações toast
- **lucide-react** - Ícones

## 🐛 Troubleshooting

### Erro: "Network Error"
- Verifique se o backend está rodando em `http://localhost:8000`
- Verifique se CORS está configurado no Django

### Erro: "401 Unauthorized"
- Token pode ter expirado - faça logout e login novamente
- Verifique se o token está sendo enviado no header

### Chat não conecta
- Verifique se Django Channels está rodando
- Verifique se Redis está ativo
- Confira a URL do WebSocket no `.env`

### Upload de imagem falha
- Backend precisa aceitar `multipart/form-data`
- Verifique configuração de `MEDIA_ROOT` no Django

## 🔄 Próximos Passos

1. **Criar o backend Django** usando o prompt fornecido
2. **Rodar migrations** no Django
3. **Criar dados de teste** (fixtures)
4. **Configurar CORS** no Django
5. **Testar funcionalidades**:
   - [ ] Login/Registro
   - [ ] Busca de freelancers
   - [ ] Enviar mensagem
   - [ ] Chat em tempo real
   - [ ] Upload de foto
   - [ ] Editar perfil

## 📞 Contato Direto (Feature Principal)

A funcionalidade principal do FreelaJá é o **contato direto**:

- Employers podem enviar mensagens para freelancers **SEM aprovação prévia**
- Ao clicar em "Enviar Mensagem", a conexão é criada automaticamente como `status='accepted'`
- Freelancers veem as mensagens instantaneamente na aba "Mensagens"
- Não há sistema de "solicitação pendente"

---

**Status:** ✅ Front-end 100% integrado e pronto para conectar com backend Django!
