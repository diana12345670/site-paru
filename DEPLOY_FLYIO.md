# Deploy no Fly.io - Aldeia Kariri Xocó

Este guia mostra como fazer o deploy do site da Aldeia Kariri Xocó no Fly.io.

## Pré-requisitos

### 1. Instalar o Fly CLI

**Linux/Mac:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows (PowerShell):**
```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

### 2. Criar conta no Fly.io

```bash
fly auth signup
```

Ou faça login se já tiver uma conta:
```bash
fly auth login
```

## Deploy

### 1. Configure o nome do app (opcional)

Edite o arquivo `fly.toml` e altere o nome do app:
```toml
app = "seu-nome-personalizado"
```

Se não alterar, o Fly.io gerará um nome automaticamente.

### 2. Crie o app no Fly.io

```bash
fly apps create kariri-xoco-web
```

Ou use o nome que você escolheu no passo anterior.

### 3. Configure variáveis de ambiente (se necessário)

Se precisar de variáveis de ambiente secretas:
```bash
fly secrets set NOME_DA_VARIAVEL="valor"
```

### 4. Faça o deploy

```bash
fly deploy
```

O Fly.io irá:
- Construir a imagem Docker
- Fazer upload da imagem
- Iniciar a aplicação

### 5. Abra o site

```bash
fly open
```

Seu site estará disponível em: `https://kariri-xoco-web.fly.dev`

## Comandos úteis

### Ver logs em tempo real
```bash
fly logs
```

### Verificar status da aplicação
```bash
fly status
```

### Acessar o console SSH
```bash
fly ssh console
```

### Escalar recursos

**Aumentar memória:**
```bash
fly scale memory 1024
```

**Aumentar número de instâncias:**
```bash
fly scale count 2
```

### Ver informações do app
```bash
fly info
```

## Domínio personalizado

Para adicionar um domínio personalizado:

```bash
fly certs add seudominio.com.br
```

Siga as instruções para configurar os registros DNS.

## Atualizar o site

Sempre que fizer alterações no código:

```bash
fly deploy
```

## Regiões disponíveis

O app está configurado para rodar em São Paulo (gru). Para ver outras regiões:

```bash
fly platform regions
```

Para mudar a região, edite `fly.toml`:
```toml
primary_region = "gru"  # São Paulo
# ou
primary_region = "mia"  # Miami
```

## Suporte

- Documentação oficial: https://fly.io/docs/
- Comunidade: https://community.fly.io/
- Status: https://status.flyio.net/

## Manter o site sempre ativo

Por padrão, o Fly.io pode pausar máquinas inativas. Para manter seu site sempre ativo:

**Configure o UptimeRobot** (recomendado):
- Veja o guia completo em `UPTIMEROBOT_CONFIG.md`
- Crie uma conta gratuita em https://uptimerobot.com/
- Configure um monitor HTTP para: `https://kariri-xoco-web.fly.dev/health`
- Intervalo: 5 minutos
- O UptimeRobot fará pings regulares mantendo o site acordado

**Ou desabilite auto-stop** (consome mais recursos):
```bash
fly scale count 1 --max-per-region 1
```

E edite `fly.toml`:
```toml
[http_service]
  auto_stop_machines = false
  auto_start_machines = false
  min_machines_running = 1
```

## Custos

O Fly.io oferece um plano gratuito que inclui:
- 3 VMs compartilhadas (256MB RAM)
- 3GB de armazenamento persistente
- 160GB de tráfego de saída

Verifique os preços atualizados em: https://fly.io/docs/about/pricing/
