import os
from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix
from shared.database import db, init_db
from shared.models import Product, Category, ProductImage

# Importar as aplicações
from store_app import store_app
from admin_app import admin_app

# Criar aplicação principal que vai rodar no Railway
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Inicializar database
init_db(app)

# Registrar as rotas da loja na aplicação principal
@app.route('/')
def index():
    return "Escolha uma aplicação: /admin ou /store"

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory('uploads', filename)

@app.route('/loja')
@app.route('/loja/')
@app.route('/loja/<path:path>')
def store_routes(path=''):
    """Proxy para todas as rotas da loja"""
    with store_app.test_client() as client:
        if path:
            response = client.get(f'/{path}')
        else:
            response = client.get('/')
        return response.get_data(as_text=True)

@app.route('/admin')
@app.route('/admin/')
@app.route('/admin/<path:path>')
def admin_routes(path=''):
    """Proxy para todas as rotas do admin"""
    with admin_app.test_client() as client:
        if path:
            response = client.get(f'/{path}')
        else:
            response = client.get('/')
        return response.get_data(as_text=True)

# Rotas para uploads (importante para imagens)
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return app.send_from_directory('uploads', filename)

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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)