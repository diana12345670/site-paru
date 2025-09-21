import os
from flask import Flask, send_from_directory, render_template
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from shared.database import db, init_db
from shared.models import Product, Category, ProductImage

# Criar aplicação principal que vai rodar no Replit
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Inicializar database
init_db(app)

# Página inicial com design melhorado
@app.route('/')
def index():
    return render_template('home.html')

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

# Importar as aplicações
from store_app import store_app
from admin_app import admin_app

# Configurar aplicação composta com DispatcherMiddleware
application = DispatcherMiddleware(app, {
    '/loja': store_app,
    '/admin': admin_app
})

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    port = int(os.environ.get('PORT', 5000))
    run_simple('0.0.0.0', port, application, use_debugger=False, use_reloader=False)