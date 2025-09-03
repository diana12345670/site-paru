/**
 * Kariri Xocó Admin Dashboard - JavaScript
 * Handles admin functionality, forms, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin functionality
    initializeSidebar();
    initializeFormHandling();
    initializeImageUpload();
    initializeDataTables();
    initializeConfirmDialogs();
    initializeTooltips();
});

/**
 * Sidebar Management
 */
function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content');
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });
    
    // Active nav item highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || currentPath.startsWith(href + '/'))) {
            link.classList.add('active');
        }
    });
}

/**
 * Form Handling
 */
function initializeFormHandling() {
    // Product form validation
    const productForms = document.querySelectorAll('form[action*="produto"]');
    productForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateProductForm(this)) {
                e.preventDefault();
                return false;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            showLoadingState(submitButton);
        });
    });
    
    // Category form handling
    const categoryForms = document.querySelectorAll('form[action*="categoria"]');
    categoryForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            showLoadingState(submitButton);
        });
    });
    
    // Auto-save draft functionality for long forms
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', debounce(function() {
            saveDraft(this);
        }, 2000));
    });
}

function validateProductForm(form) {
    let isValid = true;
    const errors = [];
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
            errors.push(`${field.labels[0]?.textContent || field.name} é obrigatório`);
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
    
    // Validate price
    const priceField = form.querySelector('input[name="price"]');
    if (priceField && parseFloat(priceField.value) <= 0) {
        isValid = false;
        priceField.classList.add('is-invalid');
        errors.push('Preço deve ser maior que zero');
    }
    
    // Validate stock quantity
    const stockField = form.querySelector('input[name="stock_quantity"]');
    if (stockField && parseInt(stockField.value) < 0) {
        isValid = false;
        stockField.classList.add('is-invalid');
        errors.push('Quantidade em estoque não pode ser negativa');
    }
    
    // Show errors if any
    if (!isValid) {
        showAlert('Corrija os seguintes erros:\n• ' + errors.join('\n• '), 'error');
    }
    
    return isValid;
}

function showLoadingState(button) {
    if (!button) return;
    
    const originalText = button.innerHTML;
    const originalDisabled = button.disabled;
    
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Salvando...';
    
    // Reset after 10 seconds (fallback)
    setTimeout(() => {
        button.disabled = originalDisabled;
        button.innerHTML = originalText;
    }, 10000);
}

/**
 * Image Upload Handling
 */
function initializeImageUpload() {
    const imageInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
    
    imageInputs.forEach(input => {
        // File validation
        input.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            validateImageFiles(files, this);
            previewImages(files, this);
        });
        
        // Drag and drop functionality
        const formGroup = input.closest('.mb-3');
        if (formGroup) {
            setupDragAndDrop(formGroup, input);
        }
    });
}

function validateImageFiles(files, input) {
    const maxSize = 16 * 1024 * 1024; // 16MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxFiles = 10;
    
    const validFiles = [];
    const errors = [];
    
    if (files.length > maxFiles) {
        errors.push(`Máximo ${maxFiles} imagens permitidas`);
        return false;
    }
    
    files.forEach((file, index) => {
        if (!allowedTypes.includes(file.type)) {
            errors.push(`Arquivo ${file.name} não é uma imagem válida`);
            return;
        }
        
        if (file.size > maxSize) {
            errors.push(`Arquivo ${file.name} é muito grande (máx. 16MB)`);
            return;
        }
        
        validFiles.push(file);
    });
    
    if (errors.length > 0) {
        showAlert('Erros nos arquivos:\n• ' + errors.join('\n• '), 'error');
        input.value = '';
        return false;
    }
    
    return true;
}

function previewImages(files, input) {
    const previewContainer = document.getElementById('imagePreview') || createPreviewContainer(input);
    previewContainer.innerHTML = '';
    
    if (files.length === 0) return;
    
    const title = document.createElement('h6');
    title.textContent = 'Pré-visualização das imagens:';
    title.className = 'mt-3 mb-2';
    previewContainer.appendChild(title);
    
    const row = document.createElement('div');
    row.className = 'row';
    
    files.forEach((file, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-4 col-6 mb-3';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.style.height = '150px';
        img.style.objectFit = 'cover';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body p-2';
        
        const fileName = document.createElement('small');
        fileName.className = 'text-muted d-block text-truncate';
        fileName.textContent = file.name;
        fileName.title = file.name;
        
        const fileSize = document.createElement('small');
        fileSize.className = 'text-muted';
        fileSize.textContent = formatFileSize(file.size);
        
        if (index === 0) {
            const mainBadge = document.createElement('div');
            mainBadge.className = 'badge bg-primary position-absolute top-0 start-0 m-1';
            mainBadge.textContent = 'Principal';
            card.style.position = 'relative';
            card.appendChild(mainBadge);
        }
        
        cardBody.appendChild(fileName);
        cardBody.appendChild(fileSize);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
        
        // Load image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    previewContainer.appendChild(row);
}

function createPreviewContainer(input) {
    const container = document.createElement('div');
    container.id = 'imagePreview';
    container.className = 'image-preview-container';
    input.parentNode.appendChild(container);
    return container;
}

function setupDragAndDrop(element, input) {
    // Add visual indicators
    element.classList.add('file-upload-area');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        element.addEventListener(eventName, () => element.classList.add('dragover'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, () => element.classList.remove('dragover'), false);
    });
    
    element.addEventListener('drop', function(e) {
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length > 0) {
            // Create a new FileList-like object
            const dt = new DataTransfer();
            imageFiles.forEach(file => dt.items.add(file));
            input.files = dt.files;
            
            // Trigger change event
            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
        }
    }, false);
}

/**
 * Data Tables Enhancement
 */
function initializeDataTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Add sorting functionality to table headers
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            if (header.textContent.trim() && !header.querySelector('button')) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => sortTable(table, index));
            }
        });
        
        // Add hover effects
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(214, 114, 41, 0.05)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    const header = table.querySelectorAll('th')[columnIndex];
    const isAsc = !header.classList.contains('sort-desc');
    
    // Remove previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Add current sort indicator
    header.classList.add(isAsc ? 'sort-asc' : 'sort-desc');
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex]?.textContent.trim() || '';
        const bValue = b.cells[columnIndex]?.textContent.trim() || '';
        
        // Try to parse as numbers
        const aNum = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAsc ? aNum - bNum : bNum - aNum;
        } else {
            return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });
    
    // Reorder rows in DOM
    rows.forEach(row => tbody.appendChild(row));
}

/**
 * Confirmation Dialogs
 */
function initializeConfirmDialogs() {
    const deleteLinks = document.querySelectorAll('a[onclick*="confirm"]');
    
    deleteLinks.forEach(link => {
        // Remove inline onclick and add event listener
        const confirmMessage = link.getAttribute('onclick').match(/'([^']+)'/)?.[1] || 'Tem certeza?';
        link.removeAttribute('onclick');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showConfirmDialog(confirmMessage, () => {
                window.location.href = this.href;
            });
        });
    });
}

function showConfirmDialog(message, onConfirm, onCancel = null) {
    // Create modal dialog
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmação</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmBtn">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Handle confirmation
    modal.querySelector('#confirmBtn').addEventListener('click', () => {
        modalInstance.hide();
        if (onConfirm) onConfirm();
    });
    
    // Cleanup when hidden
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
        if (onCancel) onCancel();
    });
}

/**
 * Tooltips and Popovers
 */
function initializeTooltips() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"], [title]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        if (!tooltipTriggerEl.getAttribute('data-bs-toggle')) {
            tooltipTriggerEl.setAttribute('data-bs-toggle', 'tooltip');
        }
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Dashboard Statistics Animation
 */
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.card h2');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 50);
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue);
        }, 50);
    });
}

// Run statistics animation when dashboard loads
if (window.location.pathname === '/' || window.location.pathname.includes('dashboard')) {
    setTimeout(animateStatistics, 500);
}

/**
 * Form Auto-save
 */
function saveDraft(element) {
    const formId = element.closest('form')?.id;
    if (!formId) return;
    
    const draftKey = `draft_${formId}_${element.name}`;
    localStorage.setItem(draftKey, element.value);
    
    // Show save indicator
    showSaveIndicator(element);
}

function loadDrafts() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        const formId = textarea.closest('form')?.id;
        if (!formId) return;
        
        const draftKey = `draft_${formId}_${textarea.name}`;
        const draftValue = localStorage.getItem(draftKey);
        
        if (draftValue && !textarea.value) {
            textarea.value = draftValue;
            showDraftIndicator(textarea);
        }
    });
}

function showSaveIndicator(element) {
    let indicator = element.parentNode.querySelector('.save-indicator');
    if (!indicator) {
        indicator = document.createElement('small');
        indicator.className = 'save-indicator text-muted';
        element.parentNode.appendChild(indicator);
    }
    
    indicator.textContent = 'Rascunho salvo automaticamente';
    indicator.style.opacity = '1';
    
    setTimeout(() => {
        indicator.style.opacity = '0';
    }, 2000);
}

function showDraftIndicator(element) {
    const indicator = document.createElement('small');
    indicator.className = 'text-info';
    indicator.textContent = 'Rascunho restaurado';
    element.parentNode.appendChild(indicator);
    
    setTimeout(() => {
        indicator.remove();
    }, 3000);
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

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <div style="white-space: pre-line;">${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at top of main content
    const container = document.querySelector('.container-fluid');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 8000);
    }
}

/**
 * Export Management
 */
function exportTableToCSV(tableId, filename = 'export.csv') {
    const table = document.getElementById(tableId) || document.querySelector('table');
    if (!table) return;
    
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => {
            // Clean up cell content
            const text = cell.textContent.trim().replace(/\s+/g, ' ');
            return `"${text.replace(/"/g, '""')}"`;
        }).join(',');
    }).join('\n');
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Load drafts when page loads
document.addEventListener('DOMContentLoaded', loadDrafts);

// Export functions for global access
window.adminUtils = {
    showAlert,
    showConfirmDialog,
    formatFileSize,
    exportTableToCSV
};
