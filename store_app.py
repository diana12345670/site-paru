import os
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from werkzeug.middleware.proxy_fix import ProxyFix
from shared.database import db, init_db
from shared.models import Product, Category, ProductImage

# Create Flask app for store
store_app = Flask(__name__)
store_app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
store_app.wsgi_app = ProxyFix(store_app.wsgi_app, x_proto=1, x_host=1)

# Initialize database
init_db(store_app)

# Initialize session cart
def init_cart():
    if 'cart' not in session:
        session['cart'] = {}

@store_app.route('/')
def index():
    """Homepage with featured products"""
    featured_products = Product.query.filter_by(is_active=True).limit(8).all()
    categories = Category.query.all()
    return render_template('store/index.html', products=featured_products, categories=categories)

@store_app.route('/categoria/<int:category_id>')
def category_products(category_id):
    """Products by category"""
    category = Category.query.get_or_404(category_id)
    products = Product.query.filter_by(category_id=category_id, is_active=True).all()
    categories = Category.query.all()
    return render_template('store/category.html', category=category, products=products, categories=categories)

@store_app.route('/produto/<int:product_id>')
def product_detail(product_id):
    """Product detail page"""
    product = Product.query.get_or_404(product_id)
    if not product.is_active:
        flash('Produto não disponível', 'error')
        return redirect(url_for('index'))
    
    related_products = Product.query.filter_by(
        category_id=product.category_id, 
        is_active=True
    ).filter(Product.id != product_id).limit(4).all()
    
    return render_template('store/product.html', product=product, related_products=related_products)

@store_app.route('/adicionar-carrinho', methods=['POST'])
def add_to_cart():
    """Add product to cart"""
    init_cart()
    
    product_id = request.form.get('product_id')
    quantity = int(request.form.get('quantity', 1))
    
    product = Product.query.get_or_404(product_id)
    
    if not product.is_active:
        flash('Produto não disponível', 'error')
        return redirect(url_for('product_detail', product_id=product_id))
    
    if quantity > product.stock_quantity:
        flash('Quantidade não disponível em estoque', 'error')
        return redirect(url_for('product_detail', product_id=product_id))
    
    cart = session['cart']
    product_id_str = str(product_id)
    
    if product_id_str in cart:
        cart[product_id_str] += quantity
    else:
        cart[product_id_str] = quantity
    
    session['cart'] = cart
    session.modified = True
    
    flash(f'{product.name} adicionado ao carrinho!', 'success')
    return redirect(url_for('product_detail', product_id=product_id))

@store_app.route('/carrinho')
def cart():
    """Shopping cart page"""
    init_cart()
    
    cart_items = []
    total = 0
    
    for product_id, quantity in session['cart'].items():
        product = Product.query.get(int(product_id))
        if product and product.is_active:
            item_total = product.price * quantity
            cart_items.append({
                'product': product,
                'quantity': quantity,
                'total': item_total
            })
            total += item_total
    
    return render_template('store/cart.html', cart_items=cart_items, total=total)

@store_app.route('/remover-carrinho/<int:product_id>')
def remove_from_cart(product_id):
    """Remove product from cart"""
    init_cart()
    
    cart = session['cart']
    product_id_str = str(product_id)
    
    if product_id_str in cart:
        del cart[product_id_str]
        session['cart'] = cart
        session.modified = True
        flash('Produto removido do carrinho', 'success')
    
    return redirect(url_for('cart'))

@store_app.route('/atualizar-carrinho', methods=['POST'])
def update_cart():
    """Update cart quantities"""
    init_cart()
    
    cart = session['cart']
    
    for product_id in cart.keys():
        quantity_key = f'quantity_{product_id}'
        if quantity_key in request.form:
            new_quantity = int(request.form[quantity_key])
            if new_quantity <= 0:
                del cart[product_id]
            else:
                cart[product_id] = new_quantity
    
    session['cart'] = cart
    session.modified = True
    flash('Carrinho atualizado', 'success')
    
    return redirect(url_for('cart'))

@store_app.context_processor
def inject_cart_count():
    """Inject cart count into all templates"""
    init_cart()
    cart_count = sum(session['cart'].values())
    return {'cart_count': cart_count}

@store_app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    from flask import send_from_directory
    return send_from_directory('uploads', filename)

if __name__ == '__main__':
    store_app.run(host='0.0.0.0', port=8080, debug=True)
