# Configuração do UptimeRobot - Aldeia Kariri Xocó

Este guia mostra como configurar o UptimeRobot para manter seu site no Fly.io sempre ativo, evitando que entre em modo sleep.

## Por que usar o UptimeRobot?

O Fly.io pode pausar máquinas inativas para economizar recursos. O UptimeRobot faz requisições regulares ao seu site, mantendo-o sempre ativo e também monitorando se está online.

## Passo a Passo

### 1. Criar conta no UptimeRobot

Acesse: https://uptimerobot.com/

- Clique em **Sign Up** (Cadastro gratuito)
- Preencha seus dados
- Confirme seu email

### 2. Adicionar novo monitor

1. Faça login no painel do UptimeRobot
2. Clique em **+ Add New Monitor**

### 3. Configurar o monitor

Preencha os campos:

**Monitor Type (Tipo de Monitor):**
- Selecione: `HTTP(s)`

**Friendly Name (Nome Amigável):**
- Digite: `Kariri Xocó - Fly.io`

**URL (or IP):**
- Digite: `https://kariri-xoco-web.fly.dev/health`
  - ⚠️ **Importante**: Use `/health` no final da URL
  - Se você mudou o nome do app no Fly.io, use: `https://SEU-APP-NAME.fly.dev/health`

**Monitoring Interval (Intervalo de Monitoramento):**
- Selecione: `5 minutes` (plano gratuito)
  - Isso fará uma requisição a cada 5 minutos
  - Suficiente para manter o site acordado

**Monitor Timeout (Tempo Limite):**
- Deixe: `30 seconds` (padrão)

**Alert Contacts (Contatos de Alerta):**
- (Opcional) Adicione seu email para receber alertas se o site cair

### 4. Configurações avançadas (opcional)

Clique em **Advanced Settings** se quiser personalizar:

**Keyword Monitoring:**
- Você pode verificar se a resposta contém uma palavra específica
- Para o endpoint `/health`, você pode adicionar:
  - Keyword Type: `Exists`
  - Keyword Value: `ok`

Isso garante que não apenas o site está respondendo, mas está respondendo corretamente.

### 5. Salvar o monitor

- Clique em **Create Monitor**
- Pronto! O UptimeRobot começará a monitorar em alguns segundos

## Verificar se está funcionando

### No UptimeRobot:
1. Vá para o **Dashboard**
2. Você verá seu monitor listado
3. Após alguns minutos, verá:
   - Status: **Up** (verde) ✅
   - Uptime: `100%`
   - Response Time: tempo de resposta

### Nos logs do Fly.io:
```bash
fly logs
```

Você verá requisições GET regulares para `/health` a cada 5 minutos:
```
GET /health 200 in 15ms
```

## Recursos do Plano Gratuito

O plano gratuito do UptimeRobot inclui:

✅ Até 50 monitores  
✅ Verificações a cada 5 minutos  
✅ Alertas por email  
✅ Histórico de 60 dias  
✅ Monitoramento de SSL  

Perfeito para manter seu site sempre ativo!

## Alertas (Opcional)

### Configurar alertas de email:

1. No painel, vá em **My Settings**
2. Em **Alert Contacts**, adicione seu email
3. Confirme o email
4. Edite seu monitor e adicione o contato em **Alert Contacts**

Você receberá um email se:
- O site ficar offline por mais de 5 minutos
- O site voltar ao ar
- Houver problemas de SSL/certificado

## Estatísticas e Relatórios

O UptimeRobot mostra:

- **Uptime %**: Porcentagem de tempo que o site está online
- **Response Time**: Tempo de resposta médio
- **Downtime History**: Histórico de quedas
- **Gráficos**: Visualização do desempenho

## Status Page Público (Opcional)

Você pode criar uma página de status pública:

1. Vá em **Status Pages** no menu
2. Clique em **Add New Status Page**
3. Configure:
   - Nome: `Aldeia Kariri Xocó`
   - Selecione seus monitores
   - Personalize cores e logo
4. Compartilhe a URL gerada

Exemplo: `https://stats.uptimerobot.com/seu-id`

## Dicas

✅ **Use o endpoint /health**: Ele é otimizado e responde rapidamente  
✅ **Mantenha 5 minutos**: Evita uso excessivo de recursos  
✅ **Ative alertas**: Saiba imediatamente se algo der errado  
✅ **Monitore SSL**: O UptimeRobot avisa antes do certificado expirar  

## Alternativas ao UptimeRobot

Se preferir, há outras opções gratuitas:

- **Freshping** (Freshworks) - Similar ao UptimeRobot
- **StatusCake** - Mais recursos no plano gratuito
- **Pingdom** - Versão trial gratuita
- **Cron-job.org** - Apenas para pings simples

## Suporte

- UptimeRobot Docs: https://uptimerobot.com/help/
- Suporte: support@uptimerobot.com
- Status: https://uptimerobotstatus.com/

---

Pronto! Seu site agora ficará sempre ativo no Fly.io! 🚀
