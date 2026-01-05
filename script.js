// Default menu items
const defaultMenuItems = [
    { id: 1, name: 'Idly', price: 35, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop' },
    { id: 2, name: 'Poori', price: 40, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
    { id: 3, name: 'Vada', price: 15, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
    { id: 4, name: 'Dosa', price: 35, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop' }
];

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize application
function init() {
    loadMenuItems();
    loadCart();
}

// Load menu items from localStorage
function loadMenuItems() {
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    
    // If no items exist, initialize with default items
    if (menuItems.length === 0) {
        menuItems = defaultMenuItems;
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
    
    displayMenuItems(menuItems);
}

// Display menu items
function displayMenuItems(menuItems) {
    const menuGrid = document.getElementById('menuGrid');
    const emptyMenu = document.getElementById('emptyMenu');
    
    if (menuItems.length === 0) {
        menuGrid.classList.add('hidden');
        emptyMenu.classList.remove('hidden');
        return;
    }
    
    menuGrid.classList.remove('hidden');
    emptyMenu.classList.add('hidden');
    
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <img src="${item.image || 'https://via.placeholder.com/200x150?text=' + item.name}" 
                 alt="${item.name}" 
                 onerror="this.src='https://via.placeholder.com/200x150?text=${item.name}'">
            <h3>${item.name}</h3>
            <div class="price">₹${item.price}</div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span id="qty-${item.id}">0</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <div class="actions">
                <button class="btn btn-success" onclick="addToCart(${item.id})">Add to Cart</button>
                <button class="btn btn-warning" onclick="editMenuItem(${item.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteMenuItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadCart() {
    displayCart();
}

function addToCart(itemId) {
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    const item = menuItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    const quantity = parseInt(document.getElementById(`qty-${itemId}`).textContent) || 1;
    
    if (quantity === 0) {
        alert('Please select a quantity first');
        return;
    }
    
    const existingItem = cart.find(c => c.itemId === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            itemId: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity
        });
    }
    
    // Reset quantity display
    document.getElementById(`qty-${itemId}`).textContent = '0';
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function increaseQuantity(itemId) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let qty = parseInt(qtyElement.textContent) || 0;
    qty++;
    qtyElement.textContent = qty;
}

function decreaseQuantity(itemId) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let qty = parseInt(qtyElement.textContent) || 0;
    if (qty > 0) {
        qty--;
        qtyElement.textContent = qty;
    }
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.classList.remove('hidden');
        cartTotal.classList.add('hidden');
        return;
    }
    
    emptyCart.classList.add('hidden');
    cartTotal.classList.remove('hidden');
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price} per item</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="cart-quantity-controls">
                    <button onclick="decreaseCartQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseCartQuantity(${index})">+</button>
                </div>
                <span class="cart-item-total">₹${item.price * item.quantity}</span>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function increaseCartQuantity(index) {
    if (cart[index]) {
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function decreaseCartQuantity(index) {
    if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// CRUD Operations
function saveMenuItem(event) {
    event.preventDefault();
    
    const id = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    
    if (id) {
        // Edit existing item
        const index = menuItems.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            menuItems[index] = {
                ...menuItems[index],
                name,
                price
            };
        }
    } else {
        // Add new item
        const newId = menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1;
        menuItems.push({
            id: newId,
            name,
            price,
            image: ''
        });
    }
    
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    loadMenuItems();
    
    // Reset form
    document.getElementById('menuForm').reset();
    document.getElementById('itemId').value = '';
    document.getElementById('cancelBtn').style.display = 'none';
}

function editMenuItem(itemId) {
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    const item = menuItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    document.getElementById('itemId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('cancelBtn').style.display = 'inline-block';
    
    // Scroll to form
    document.getElementById('menuForm').scrollIntoView({ behavior: 'smooth' });
}

function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    menuItems = menuItems.filter(item => item.id !== itemId);
    
    // Also remove from cart if present
    cart = cart.filter(item => item.itemId !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    loadMenuItems();
    displayCart();
}

function cancelEdit() {
    document.getElementById('menuForm').reset();
    document.getElementById('itemId').value = '';
    document.getElementById('cancelBtn').style.display = 'none';
}

// Billing
function generateBill() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const billSection = document.getElementById('billSection');
    const billContent = document.getElementById('billContent');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const date = new Date().toLocaleString();
    const customerName = document.getElementById('customerName').value || 'Walk-in Customer';
    const customerPhone = document.getElementById('customerPhone').value || 'N/A';
    
    billContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 2em;">🍽️ Sharans Hotel</h2>
            <p style="color: #666; font-weight: 600;">Billing Receipt</p>
            <p style="color: #999; font-size: 0.9em;">Date: ${date}</p>
        </div>
        <div class="bill-customer-info">
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Phone Number:</strong> ${customerPhone}</p>
        </div>
        ${cart.map(item => `
            <div class="bill-item">
                <div>
                    <strong>${item.name}</strong> (${item.quantity} × ₹${item.price})
                </div>
                <div><strong>₹${(item.price * item.quantity).toFixed(2)}</strong></div>
            </div>
        `).join('')}
        <div class="bill-total">
            <span>Total Amount:</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
    `;
    
    billSection.classList.remove('hidden');
    billSection.scrollIntoView({ behavior: 'smooth' });
}

function printBill() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    
    if (!customerName || !customerPhone) {
        alert('Please enter customer name and phone number before printing!');
        return;
    }
    
    window.print();
}

function closeBill() {
    document.getElementById('billSection').classList.add('hidden');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Initialize on page load
init();
