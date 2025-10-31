# Deploy no Netlify - Site Aldeia Kariri Xocó

Guia completo para fazer o deploy do site da Aldeia Kariri Xocó no Netlify.

## 📋 O que é o Netlify?

O Netlify é uma plataforma de hospedagem para sites e aplicações web que oferece:
- Deploy automático via Git
- Serverless Functions (para o backend)
- CDN global gratuito
- HTTPS automático
- Domínio gratuito (.netlify.app)
- Plano gratuito generoso

## 🎯 Arquitetura do Deploy

Este projeto usa **Netlify Serverless Functions** para rodar o backend Express:

```
Frontend (React)          →  Netlify CDN (estático)
Backend (Express)         →  Netlify Functions (serverless)
Armazenamento            →  Memória (MemStorage)
Assets (imagens)         →  Servidos estaticamente
```

## 📦 Pré-requisitos

1. Conta no GitHub (gratuita)
2. Conta no Netlify (gratuita)
3. Git instalado localmente

## 🚀 Passo a Passo do Deploy

### 1️⃣ Preparar o Repositório no GitHub

#### Criar repositório no GitHub:

1. Acesse https://github.com
2. Clique em **"New repository"** (repositório novo)
3. Nome: `aldeia-kariri-xoco-site`
4. Deixe como **Public** (público)
5. **NÃO** marque "Add README"
6. Clique em **"Create repository"**

#### Fazer push do código:

No terminal, dentro da pasta `site-paru`:

```bash
# Inicializar git (se ainda não estiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Configuração inicial para deploy no Netlify"

# Adicionar o remote do GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/aldeia-kariri-xoco-site.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 2️⃣ Conectar ao Netlify

1. Acesse https://netlify.com
2. Clique em **"Sign up"** (ou "Log in" se já tiver conta)
3. Escolha **"Sign up with GitHub"** (mais fácil)
4. Autorize o Netlify a acessar sua conta GitHub

### 3️⃣ Criar Novo Site no Netlify

1. No painel do Netlify, clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Autorize o Netlify a acessar seus repositórios (se pedir)
4. Encontre e selecione o repositório `aldeia-kariri-xoco-site`

### 4️⃣ Configurar o Deploy

O Netlify deve detectar automaticamente as configurações do `netlify.toml`, mas confirme:

**Base directory:** (deixe vazio - ou coloque `site-paru` se estiver usando monorepo)

**Build command:**
```bash
npm run build
```

**Publish directory:**
```bash
dist/public
```

**Functions directory:**
```bash
netlify/functions
```

### 5️⃣ Configurar Variáveis de Ambiente (se necessário)

Se seu projeto precisar de variáveis de ambiente:

1. No painel do Netlify, vá em **Site settings** (Configurações do site)
2. Clique em **Build & deploy** → **Environment** (Ambiente)
3. Clique em **"Add a variable"** (Adicionar variável)
4. Adicione as variáveis necessárias (exemplo):
   - `NODE_ENV` = `production`

### 6️⃣ Fazer o Deploy

1. Clique em **"Deploy site"** (Implantar site)
2. Aguarde o build (leva 2-5 minutos)
3. Acompanhe o progresso em **"Deploy log"** (Log de implantação)

✅ **Pronto!** Seu site estará no ar em uma URL como:
```
https://random-name-12345.netlify.app
```

## 🌐 Configurar Domínio Personalizado (Opcional)

### Opção 1: Usar domínio Netlify customizado (gratuito)

1. No painel do site, vá em **Site settings** → **Domain management**
2. Em **Custom domains**, clique em **"Add domain alias"**
3. Digite um nome disponível: `aldeia-kariri-xoco.netlify.app`
4. Clique em **"Save"**

### Opção 2: Usar seu próprio domínio

Se você tem um domínio (ex: `aldeiakariri.com.br`):

1. No painel, vá em **Site settings** → **Domain management**
2. Clique em **"Add custom domain"**
3. Digite seu domínio: `aldeiakariri.com.br`
4. Siga as instruções para configurar o DNS:

**Se o domínio estiver em outro lugar (ex: Registro.br):**
```
Tipo: A
Nome: @
Valor: 75.2.60.5

Tipo: CNAME
Nome: www
Valor: seu-site.netlify.app
```

**OU use os Netlify DNS (mais fácil):**
- Transfira o gerenciamento de DNS para o Netlify
- O Netlify fornecerá nameservers (servidores de nomes)
- Configure no Registro.br

5. Aguarde a propagação DNS (até 48h, geralmente 1-2h)
6. O Netlify ativará HTTPS automaticamente

## 🔄 Deploy Contínuo (Automático)

Após o primeiro deploy, toda vez que você fizer push para o GitHub:

```bash
git add .
git commit -m "Atualização do site"
git push
```

✨ O Netlify detectará e fará deploy automaticamente!

## 📊 Monitoramento

### Ver logs de deploy:
1. Painel do Netlify → **Deploys**
2. Clique no deploy que quer ver
3. Veja os logs completos

### Ver logs das Functions:
1. Painel do Netlify → **Functions**
2. Clique em **"api"**
3. Veja os logs em tempo real

### Analytics (Análises):
1. Painel do Netlify → **Analytics** (pode ser plano pago)
2. Ou use Google Analytics gratuitamente

## 🛠️ Comandos Úteis

### Build local (testar antes do deploy):
```bash
npm run build
```

### Testar localmente com Netlify CLI:
```bash
# Instalar Netlify CLI (uma vez)
npm install -g netlify-cli

# Fazer login
netlify login

# Testar localmente (simula o ambiente Netlify)
netlify dev

# Deploy manual via CLI
netlify deploy --prod
```

## 📁 Estrutura de Arquivos Netlify

```
site-paru/
├── netlify/
│   └── functions/
│       └── api.js              # Express convertido para serverless (JavaScript)
├── client/
│   ├── public/
│   │   └── _redirects          # Regras de redirecionamento
│   └── src/                    # Código React
├── netlify.toml                # Configuração principal do Netlify
├── package.json
└── ...
```

## ⚙️ Como Funciona

### Frontend (React):
- Build com Vite → `dist/public/`
- Servido via CDN do Netlify
- Rápido e global

### Backend (Express):
- Convertido para Netlify Function via `serverless-http`
- Cada requisição `/api/*` vai para `/.netlify/functions/api`
- Executa como AWS Lambda (serverless)

### Rotas API:
```
https://seu-site.netlify.app/api/contact      → Netlify Function
https://seu-site.netlify.app/api/gallery      → Netlify Function
https://seu-site.netlify.app/health           → Netlify Function
https://seu-site.netlify.app/                 → React App (CDN)
```

## 🔒 Limitações do Plano Gratuito

- **Builds:** 300 minutos/mês
- **Bandwidth:** 100 GB/mês
- **Functions:** 125.000 requisições/mês
- **Execução:** 100 horas de execução/mês
- **Tamanho função:** 50 MB
- **Timeout:** 10 segundos (26s no plano pago)

Para um site como este, o plano gratuito é mais que suficiente! 🎉

## ❓ Solução de Problemas

### Build falhou:
```bash
# Verifique os logs no painel Netlify
# Teste localmente:
npm install
npm run build
```

### Function não responde:
- Verifique os logs em **Functions** no painel
- Confirme que o `netlify.toml` está correto
- Teste localmente com `netlify dev`

### Imagens não aparecem:
- Confirme que `attached_assets/` está no repositório
- Verifique se as imagens foram incluídas no build
- Check que os caminhos começam com `/attached_assets/`

### Erro 404 em rotas React:
- Confirme que `_redirects` existe em `client/public/`
- Confirme as regras no `netlify.toml`

### Erro CORS:
- Não é comum com Netlify (tudo no mesmo domínio)
- Se aparecer, adicione headers CORS na função

## 📞 Suporte

- Documentação Netlify: https://docs.netlify.com
- Comunidade: https://answers.netlify.com
- Status: https://www.netlifystatus.com

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Configure domínio personalizado
2. ✅ Configure analytics (Google Analytics)
3. ✅ Adicione um badge de status ao README
4. ✅ Configure notificações de deploy (email/Slack)
5. ✅ Considere upgrade se tráfego aumentar

---

**Pronto! Seu site da Aldeia Kariri Xocó está no ar! 🚀**

Para atualizar, basta fazer:
```bash
git add .
git commit -m "Minha atualização"
git push
```

E o Netlify fará o resto automaticamente! ✨
