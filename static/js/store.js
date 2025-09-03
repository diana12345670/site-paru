/**
 * Kariri Xocó Store - Frontend JavaScript
 * Handles cart functionality, product interactions, and UI enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize store functionality
    initializeCart();
    initializeProductGallery();
    initializeScrollAnimations();
    initializeNavigation();
    initializeSearch();
});

/**
 * Cart Management
 */
function initializeCart() {
    // Update cart count display
    updateCartDisplay();
    
    // Handle quantity changes in cart
    const quantityInputs = document.querySelectorAll('input[name^="quantity_"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateQuantityInput(this);
        });
        
        input.addEventListener('input', function() {
            debounce(function() {
                validateQuantityInput(input);
            }, 500)();
        });
    });
    
    // Handle add to cart forms
    const addToCartForms = document.querySelectorAll('form[action*="adicionar-carrinho"]');
    addToCartForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Adicionando...';
            
            // Reset after a delay (form will submit normally)
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
            }, 2000);
        });
    });
}

function validateQuantityInput(input) {
    const value = parseInt(input.value);
    const min = parseInt(input.getAttribute('min'));
    const max = parseInt(input.getAttribute('max'));
    
    if (value < min) {
        input.value = min;
        showAlert('Quantidade mínima é ' + min, 'warning');
    } else if (value > max) {
        input.value = max;
        showAlert('Quantidade máxima disponível é ' + max, 'warning');
    }
}

function updateCartDisplay() {
    // This function would typically sync with server-side cart data
    // For now, we'll enhance the existing cart count display
    const cartBadges = document.querySelectorAll('.badge');
    cartBadges.forEach(badge => {
        if (badge.textContent && parseInt(badge.textContent) > 0) {
            badge.classList.add('animate-pulse');
        }
    });
}

/**
 * Product Gallery and Images
 */
function initializeProductGallery() {
    // Handle product image carousel
    const productCarousels = document.querySelectorAll('#productCarousel');
    productCarousels.forEach(carousel => {
        // Auto-advance carousel every 5 seconds
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    });
    
    // Handle thumbnail clicks
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            const carousel = bootstrap.Carousel.getInstance(document.getElementById('productCarousel'));
            const slideIndex = parseInt(this.getAttribute('data-bs-slide-to'));
            
            if (carousel) {
                carousel.to(slideIndex);
            }
            
            // Update thumbnail active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Lazy loading for product images
    const productImages = document.querySelectorAll('.product-image');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        productImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe product cards and sections
    const elementsToAnimate = document.querySelectorAll('.product-card, .card, section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Navigation Enhancements
 */
function initializeNavigation() {
    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
    
    // Active page highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * Search and Filter Functionality
 */
function initializeSearch() {
    // Quick search functionality (if search input exists)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterProducts(searchTerm);
        }, 300));
    }
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const productDescription = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm) || searchTerm === '') {
            card.closest('.col-lg-3, .col-lg-4, .col-md-6').style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.closest('.col-lg-3, .col-lg-4, .col-md-6').style.display = 'none';
        }
    });
}

/**
 * Utility Functions
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at top of main content
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

/**
 * Product Quick View Modal (if needed)
 */
function showProductQuickView(productId) {
    // This would implement a quick view modal for products
    // For now, we'll just redirect to the product page
    window.location.href = `/produto/${productId}`;
}

/**
 * WhatsApp Integration for Contact
 */
function sendWhatsAppMessage(message) {
    const phoneNumber = '5571994754379'; // Aldeia Kariri Xocó WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Copy functionality for cart summary
 */
function copyCartToClipboard() {
    const cartItems = document.querySelectorAll('.cart-item');
    let cartText = '🛍️ *Meu Pedido - Loja Kariri Xocó*\n\n';
    
    cartItems.forEach(item => {
        const productName = item.querySelector('.product-name')?.textContent || '';
        const quantity = item.querySelector('.quantity-input')?.value || '1';
        const price = item.querySelector('.product-price')?.textContent || '';
        const subtotal = item.querySelector('.item-subtotal')?.textContent || '';
        
        if (productName) {
            cartText += `• ${productName}\n`;
            cartText += `  Quantidade: ${quantity}\n`;
            cartText += `  Preço: ${price}\n`;
            cartText += `  Subtotal: ${subtotal}\n\n`;
        }
    });
    
    const total = document.querySelector('.cart-total')?.textContent || '';
    if (total) {
        cartText += `💰 *Total: ${total}*\n\n`;
    }
    
    cartText += '📱 WhatsApp: (71) 9947-5439\n';
    cartText += '📷 Instagram: @aldeiakariri_xocomultietnica\n';
    cartText += '🏪 Visite nossa loja online!';
    
    // Copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(cartText).then(() => {
            showAlert('Resumo do carrinho copiado! Cole no Instagram para finalizar o pedido.', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(cartText);
        });
    } else {
        fallbackCopyToClipboard(cartText);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showAlert('Resumo do carrinho copiado! Cole no Instagram para finalizar o pedido.', 'success');
    } catch (err) {
        showAlert('Erro ao copiar. Tente novamente.', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Cultural Elements Animation
 */
function initializeCulturalAnimations() {
    // Animate feather icons
    const featherIcons = document.querySelectorAll('.fa-feather-alt');
    featherIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    // Floating animation for hero elements
    const heroElements = document.querySelectorAll('.hero-logo');
    heroElements.forEach(element => {
        let animation = element.animate([
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0px)' }
        ], {
            duration: 3000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    });
}

// Initialize cultural animations when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCulturalAnimations);

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to a logging service
});

// Export functions for global access
window.storeUtils = {
    showAlert,
    formatPrice,
    copyCartToClipboard,
    sendWhatsAppMessage
};
