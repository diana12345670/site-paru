
import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix
from shared.database import db, init_db
from shared.models import Product, Category, ProductImage
from store_app import *
from admin_app import *

# Aplicação única para Railway
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "kariri-xoco-secret-2024")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configurar banco PostgreSQL para Railway
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    # Railway PostgreSQL
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
else:
    # Fallback local
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kariri_store.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# Inicializar database
db.init_app(app)

# Criar tabelas
with app.app_context():
    db.create_all()

# === ROTAS DA LOJA ===
@app.route('/')
def index():
    products = Product.query.filter_by(active=True).limit(8).all()
    categories = Category.query.filter_by(active=True).all()
    return render_template('store/index.html', products=products, categories=categories)

@app.route('/categoria/<int:category_id>')
def category_products(category_id):
    category = Category.query.get_or_404(category_id)
    products = Product.query.filter_by(category_id=category_id, active=True).all()
    categories = Category.query.filter_by(active=True).all()
    return render_template('store/category.html', 
                         products=products, 
                         current_category=category,
                         categories=categories)

@app.route('/produto/<int:product_id>')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    categories = Category.query.filter_by(active=True).all()
    return render_template('store/product.html', product=product, categories=categories)

@app.route('/carrinho')
def cart():
    categories = Category.query.filter_by(active=True).all()
    return render_template('store/cart.html', categories=categories)

# === ROTAS DO ADMIN ===
@app.route('/admin')
def admin_dashboard():
    products_count = Product.query.count()
    categories_count = Category.query.count()
    active_products = Product.query.filter_by(active=True).count()
    return render_template('admin/dashboard.html', 
                         products_count=products_count,
                         categories_count=categories_count,
                         active_products=active_products)

@app.route('/admin/produtos')
def admin_products():
    products = Product.query.all()
    return render_template('admin/products.html', products=products)

@app.route('/admin/categorias')
def admin_categories():
    categories = Category.query.all()
    return render_template('admin/categories.html', categories=categories)

@app.route('/admin/adicionar-produto', methods=['GET', 'POST'])
def admin_add_product():
    if request.method == 'POST':
        # Lógica para adicionar produto
        name = request.form['name']
        description = request.form['description']
        price = float(request.form['price'])
        category_id = int(request.form['category_id'])
        stock_quantity = int(request.form['stock_quantity'])
        
        product = Product(
            name=name,
            description=description,
            price=price,
            category_id=category_id,
            stock_quantity=stock_quantity,
            active=True
        )
        
        db.session.add(product)
        db.session.commit()
        
        flash('Produto adicionado com sucesso!', 'success')
        return redirect(url_for('admin_products'))
    
    categories = Category.query.filter_by(active=True).all()
    return render_template('admin/add_product.html', categories=categories)

# === UTILITÁRIOS ===
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

@app.route('/health')
def health_check():
    """Endpoint para monitoramento do UptimeRobot"""
    return {
        'status': 'ok',
        'message': 'Kariri Xocó Store está online no Railway',
        'timestamp': __import__('datetime').datetime.now().isoformat()
    }

@app.route('/ping')
def ping():
    """Endpoint alternativo para ping"""
    return 'pong'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
