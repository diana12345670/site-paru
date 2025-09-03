import os
from flask import Flask, render_template, request, redirect, url_for, flash, current_app
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.utils import secure_filename
from PIL import Image
from shared.database import db, init_db
from shared.models import Product, Category, ProductImage
import uuid

# Create Flask app for admin
admin_app = Flask(__name__)
admin_app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
admin_app.wsgi_app = ProxyFix(admin_app.wsgi_app, x_proto=1, x_host=1)

# Configure upload settings
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
admin_app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
admin_app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize database
init_db(admin_app)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def resize_image(image_path, max_size=(800, 800)):
    """Resize image while maintaining aspect ratio"""
    try:
        with Image.open(image_path) as img:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            img.save(image_path, optimize=True, quality=85)
    except Exception as e:
        print(f"Error resizing image: {e}")

@admin_app.route('/')
def dashboard():
    """Admin dashboard"""
    total_products = Product.query.count()
    active_products = Product.query.filter_by(is_active=True).count()
    total_categories = Category.query.count()
    recent_products = Product.query.order_by(Product.created_at.desc()).limit(5).all()
    
    return render_template('admin/dashboard.html', 
                         total_products=total_products,
                         active_products=active_products,
                         total_categories=total_categories,
                         recent_products=recent_products)

@admin_app.route('/produtos')
def products():
    """List all products"""
    page = request.args.get('page', 1, type=int)
    products = Product.query.order_by(Product.created_at.desc()).paginate(
        page=page, per_page=10, error_out=False
    )
    return render_template('admin/products.html', products=products)

@admin_app.route('/produto/novo', methods=['GET', 'POST'])
def add_product():
    """Add new product"""
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = float(request.form['price'])
        stock_quantity = int(request.form['stock_quantity'])
        category_id = int(request.form['category_id'])
        is_active = 'is_active' in request.form
        
        # Create product
        product = Product()
        product.name = name
        product.description = description
        product.price = price
        product.stock_quantity = stock_quantity
        product.category_id = category_id
        product.is_active = is_active
        
        db.session.add(product)
        db.session.flush()  # Get the product ID
        
        # Handle image uploads
        uploaded_files = request.files.getlist('images')
        for i, file in enumerate(uploaded_files):
            if file and file.filename and allowed_file(file.filename):
                # Generate unique filename
                filename = f"{uuid.uuid4()}_{secure_filename(file.filename)}"
                filepath = os.path.join(admin_app.config['UPLOAD_FOLDER'], filename)
                
                file.save(filepath)
                resize_image(filepath)
                
                # Create ProductImage record
                product_image = ProductImage()
                product_image.filename = filename
                product_image.alt_text = f"{name} - Imagem {i+1}"
                product_image.is_main = (i == 0)  # First image is main
                product_image.product_id = product.id
                db.session.add(product_image)
        
        db.session.commit()
        flash('Produto adicionado com sucesso!', 'success')
        return redirect(url_for('products'))
    
    categories = Category.query.all()
    return render_template('admin/add_product.html', categories=categories)

@admin_app.route('/produto/<int:product_id>/editar', methods=['GET', 'POST'])
def edit_product(product_id):
    """Edit existing product"""
    product = Product.query.get_or_404(product_id)
    
    if request.method == 'POST':
        product.name = request.form['name']
        product.description = request.form['description']
        product.price = float(request.form['price'])
        product.stock_quantity = int(request.form['stock_quantity'])
        product.category_id = int(request.form['category_id'])
        product.is_active = 'is_active' in request.form
        
        # Handle new image uploads
        uploaded_files = request.files.getlist('images')
        for file in uploaded_files:
            if file and file.filename and allowed_file(file.filename):
                # Generate unique filename
                filename = f"{uuid.uuid4()}_{secure_filename(file.filename)}"
                filepath = os.path.join(admin_app.config['UPLOAD_FOLDER'], filename)
                
                file.save(filepath)
                resize_image(filepath)
                
                # Create ProductImage record
                product_image = ProductImage()
                product_image.filename = filename
                product_image.alt_text = f"{product.name} - Nova Imagem"
                product_image.is_main = False
                product_image.product_id = product.id
                db.session.add(product_image)
        
        db.session.commit()
        flash('Produto atualizado com sucesso!', 'success')
        return redirect(url_for('products'))
    
    categories = Category.query.all()
    return render_template('admin/edit_product.html', product=product, categories=categories)

@admin_app.route('/produto/<int:product_id>/deletar')
def delete_product(product_id):
    """Delete product"""
    product = Product.query.get_or_404(product_id)
    
    # Delete associated image files
    for image in product.images:
        filepath = os.path.join(admin_app.config['UPLOAD_FOLDER'], image.filename)
        try:
            os.remove(filepath)
        except OSError:
            pass
    
    db.session.delete(product)
    db.session.commit()
    flash('Produto deletado com sucesso!', 'success')
    return redirect(url_for('products'))

@admin_app.route('/produto/<int:product_id>/imagem/<int:image_id>/deletar')
def delete_product_image(product_id, image_id):
    """Delete product image"""
    image = ProductImage.query.get_or_404(image_id)
    
    # Delete file
    filepath = os.path.join(admin_app.config['UPLOAD_FOLDER'], image.filename)
    try:
        os.remove(filepath)
    except OSError:
        pass
    
    db.session.delete(image)
    db.session.commit()
    flash('Imagem deletada com sucesso!', 'success')
    return redirect(url_for('edit_product', product_id=product_id))

@admin_app.route('/categorias')
def categories():
    """List all categories"""
    categories = Category.query.all()
    return render_template('admin/categories.html', categories=categories)

@admin_app.route('/categoria/nova', methods=['POST'])
def add_category():
    """Add new category"""
    name = request.form['name']
    description = request.form.get('description', '')
    
    category = Category()
    category.name = name
    category.description = description
    db.session.add(category)
    db.session.commit()
    
    flash('Categoria adicionada com sucesso!', 'success')
    return redirect(url_for('categories'))

@admin_app.route('/categoria/<int:category_id>/deletar')
def delete_category(category_id):
    """Delete category"""
    category = Category.query.get_or_404(category_id)
    
    # Check if category has products
    if category.products:
        flash('Não é possível deletar categoria com produtos associados', 'error')
        return redirect(url_for('categories'))
    
    db.session.delete(category)
    db.session.commit()
    flash('Categoria deletada com sucesso!', 'success')
    return redirect(url_for('categories'))

if __name__ == '__main__':
    admin_app.run(host='0.0.0.0', port=5000, debug=True)
