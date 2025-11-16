# Deploy - Site Aldeia Kariri Xocó

Esta pasta contém todos os arquivos necessários para fazer o deploy do site no Fly.io.

## 📁 O que tem nesta pasta

```
flyio-deploy/
├── client/              → Frontend React
├── server/              → Backend Express
├── shared/              → Código compartilhado
├── attached_assets/     → Imagens da galeria
├── package.json         → Dependências do projeto
├── Dockerfile           → Configuração Docker
├── fly.toml             → Configuração Fly.io
├── .dockerignore        → Arquivos ignorados no build
├── DEPLOY_FLYIO.md      → Guia de deploy completo
└── UPTIMEROBOT_CONFIG.md → Guia do UptimeRobot
```

## 🚀 Como fazer o deploy

### 1. Suba para o GitHub

Você pode criar um novo repositório no GitHub com esta pasta.

**Opção A - Via GitHub Web:**
1. Acesse https://github.com/new
2. Crie um novo repositório (ex: `kariri-xoco-web`)
3. Faça upload desta pasta inteira

**Opção B - Via Git CLI:**
```bash
cd flyio-deploy
git init
git add .
git commit -m "Site Aldeia Kariri Xocó"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/kariri-xoco-web.git
git push -u origin main
```

### 2. Deploy no Fly.io

Siga as instruções completas em `DEPLOY_FLYIO.md`

**Resumo rápido:**
```bash
# Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy
fly launch
fly deploy
```

### 3. Configurar UptimeRobot

Siga as instruções em `UPTIMEROBOT_CONFIG.md` para manter o site sempre ativo.

## 📝 Documentação

- **DEPLOY_FLYIO.md** - Guia completo de deploy no Fly.io
- **UPTIMEROBOT_CONFIG.md** - Como configurar o monitoramento

## ✅ Pronto para uso

Esta pasta está 100% pronta para deploy! Não precisa adicionar ou modificar nada.

---

Site da Aldeia Kariri Xocó Multiétnica e Instituto Indígena Pawi Crody
