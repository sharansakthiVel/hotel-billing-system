# Sharans Hotel - Billing System

A simple, modern hotel billing system web application with menu management and order processing capabilities.

## Features

- **Menu Management (CRUD)**
  - View all menu items with images
  - Add new menu items
  - Edit existing items (name, price, image)
  - Delete menu items

- **Order & Billing System**
  - Add items to cart with quantity selection
  - View cart with itemized pricing
  - Generate bill receipts
  - Automatic total calculation

- **Default Menu Items**
  - Idly - ₹35
  - Poori - ₹40
  - Vada - ₹15
  - Dosa - ₹35

## Setup & Usage

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No server or installation required

2. **Using the System**
   - **View Menu**: All menu items are displayed in the main section
   - **Add to Cart**: 
     - Use +/- buttons to select quantity
     - Click "Add to Cart" button
   - **Manage Menu**:
     - Fill the form at the bottom to add new items
     - Click "Edit" on any item to modify it
     - Click "Delete" to remove items
   - **Generate Bill**: 
     - Review cart items
     - Click "Generate Bill" to create receipt
     - Click "Close Bill" to clear cart and start new order

## Data Storage

All data is stored locally in your browser using Local Storage:
- Menu items persist across sessions
- Cart is cleared after generating a bill

## Technologies Used

- HTML5
- CSS3 (Modern styling with Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Local Storage API

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- Images use placeholder URLs by default. You can add custom image URLs when creating/editing items
- All prices are in Indian Rupees (₹)
- The system automatically saves your menu items
