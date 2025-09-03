import os
from flask import Flask, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix
from shared.database import db, init_db
from shared.models import Product, Category, ProductImage

# Importar as aplicações
from store_app import store_app
from admin_app import admin_app

# Criar aplicação principal que vai rodar no Replit
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Inicializar database
init_db(app)

# Página inicial simples
@app.route('/')
def index():
    return """
    <h1>Loja Kariri Xocó - Escolha uma aplicação:</h1>
    <p><a href="/admin">Painel Administrativo (Porta 5000)</a></p>
    <p><a href="/loja">Loja Virtual (Porta 8080)</a></p>
    <p><a href="/health">Status da Aplicação</a></p>
    """

# Rotas para uploads (importante para imagens)
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

# Endpoint para UptimeRobot manter a aplicação acordada
@app.route('/health')
def health_check():
    """Endpoint para monitoramento do UptimeRobot"""
    return {
        'status': 'ok',
        'message': 'Kariri Xocó Store está online',
        'timestamp': __import__('datetime').datetime.now().isoformat()
    }

@app.route('/ping')
def ping():
    """Endpoint alternativo para ping"""
    return 'pong'

# Redirecionamentos para as aplicações separadas
@app.route('/admin')
def redirect_admin():
    return '<script>window.open("http://localhost:5000", "_blank");</script><p>Abrindo Admin Panel...</p>'

@app.route('/loja')
def redirect_store():
    return '<script>window.open("http://localhost:8080", "_blank");</script><p>Abrindo Loja Virtual...</p>'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)