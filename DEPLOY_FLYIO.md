# Deploy no Fly.io - Aldeia Kariri Xocó

Este guia mostra como fazer o deploy do site da Aldeia Kariri Xocó no Fly.io.

## ⚠️ Configuração Importante

O arquivo `fly.toml` está configurado para o app **karirixocomultietnica**. Certifique-se de que o nome do app no `fly.toml` corresponde ao nome do seu app no Fly.io.

O Fly.io está configurado para:
- Construir a imagem a partir do `Dockerfile`
- Escutar na porta 5000 (configurada como `internal_port`)
- Verificar a saúde do app via endpoint `/health` a cada 30 segundos

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

### 2. Crie o app no Fly.io (se ainda não criou)

```bash
fly apps create karirixocomultietnica
```

**Nota:** Se você já criou o app com outro nome, ajuste o `fly.toml` para usar o nome correto do seu app.

### 3. Configure variáveis de ambiente (se necessário)

Se precisar de variáveis de ambiente secretas:
```bash
fly secrets set NOME_DA_VARIAVEL="valor"
```

### 4. Faça o deploy

**IMPORTANTE:** Certifique-se de estar no diretório `site-paru` antes de fazer o deploy:

```bash
cd site-paru
fly deploy
```

O Fly.io irá:
- Construir a imagem Docker a partir do Dockerfile
- Fazer upload da imagem
- Iniciar a aplicação na porta 5000
- Verificar o health check em `/health`

### 5. Abra o site

```bash
fly open
```

Seu site estará disponível em: `https://karirixocomultietnica.fly.dev`

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

## Troubleshooting

### Problema: Health check falhando ou timeout

Se você ver mensagens como "O aplicativo não está escutando no endereço esperado" ou "tempo limite excedido":

1. **Verifique se o app está rodando:**
   ```bash
   fly ssh console
   # Dentro do SSH:
   curl http://localhost:5000/health
   ```

2. **Verifique os logs:**
   ```bash
   fly logs
   ```
   Procure por erros durante a inicialização do servidor.

3. **Verifique se o build foi feito corretamente:**
   - O `fly.toml` deve ter `dockerfile = "Dockerfile"` na seção `[build]`
   - O Dockerfile deve estar no diretório `site-paru`
   - Execute o deploy a partir do diretório `site-paru`

4. **Force um rebuild:**
   ```bash
   fly deploy --no-cache
   ```

5. **Verifique as configurações de health check no fly.toml:**
   - `grace_period = "60s"` - tempo antes de começar a verificar
   - `timeout = "15s"` - tempo máximo de resposta
   - `interval = "30s"` - frequência das verificações
   - `path = "/health"` - endpoint verificado

### Problema: Servidor não inicia no container

Se os logs mostram que o servidor não está iniciando:

1. **Teste o build localmente:**
   ```bash
   npm run build
   NODE_ENV=production PORT=5000 node dist/index.js
   ```

2. **Verifique se os arquivos foram copiados corretamente:**
   ```bash
   fly ssh console
   ls -la dist/
   ls -la attached_assets/
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
- Configure um monitor HTTP para: `https://karirixocomultietnica.fly.dev/health`
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
