# 🛒 Cartify - E-commerce Platform
![eCommerce-Animated-GIF](https://github.com/user-attachments/assets/ab6bf50d-7e10-4708-968e-55190ad2304a)

Cartify is a modern, full-stack **E-commerce platform** built with **Node.js, Express, TypeScript, and MongoDB**.  
It provides a seamless shopping experience for **customers**, a robust product & order management system for **sellers**, and a powerful admin dashboard for **administrators**.  

---

## 🚀 Features

### 👤 User Management
- User registration & login (with JWT authentication)
- Role-based access control (**Customer, Seller, Admin**)
- Profile management with profile picture upload
- Secure password handling (bcrypt)

### 🛍️ Product Management
- Create, update, delete products (Admin & Seller)
- Upload multiple product images via **Cloudinary + Multer**
- Browse products with filtering & pagination
- Category-wise product listing

### 📦 Cart & Orders
- Add products to cart (Customers)
- Remove items from cart
- Place orders directly from the cart
- Order tracking with status updates

### 💳 Payment Integration
- Integrated with **SSLCommerz** payment gateway
- Secure checkout process
- Handles **success, fail, cancel** scenarios

### ⭐ Reviews
- Customers can add product reviews
- Admin & customers can update or delete reviews
- Role-based restrictions for review management

### ⚙️ Admin Panel
- Manage all users (create, update, delete)
- Manage categories & products
- Monitor orders & payments
- Handle customer reviews

### 📂 Tech Stack
- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: MongoDB + Mongoose  
- **Authentication**: Passport.js + JWT  
- **File Uploads**: Multer + Cloudinary  
- **Payment Gateway**: SSLCommerz  
- **Caching**: Redis  
- **Validation**: Zod  

---

## 📁 Project Structure

├── src
│ ├── app.ts # Express app configuration
│ ├── server.ts # Server entry point
│ ├── app
│ │ ├── config # Configurations (Cloudinary, Redis, Passport, etc.)
│ │ ├── errors # Custom error handlers
│ │ ├── middlewares # Auth & validation middlewares
│ │ ├── modules # Main features (auth, cart, category, product, etc.)
│ │ ├── routes # All routes
│ │ └── utils # Utility functions
└── dist # Compiled JavaScript files

## Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_URL=redis://localhost:6379
SSL_STORE_ID=your_sslcommerz_store_id
SSL_STORE_PASS=your_sslcommerz_store_password

## API Routes Overview
### 👤 Auth

POST /api/v1/auth/login → User login

POST /api/v1/auth/logout → User logout

### 👥 Users

POST /api/v1/user/create-user → Register user

GET /api/v1/user/get-users → Get all users (Admin/Seller/Customer)

PATCH /api/v1/user/update-user → Update user info

### 🛒 Cart

POST /api/v1/cart/create → Add product to cart

DELETE /api/v1/cart/delete/:cartId → Remove product from cart

### 📦 Category

POST /api/v1/category/create → Create category (Admin)

GET /api/v1/category/get → Get all categories

PATCH /api/v1/category/update/:id → Update category

DELETE /api/v1/category/delete/:id → Delete category

### 🛍️ Product

POST /api/v1/product/create → Add product (Admin/Seller)

GET /api/v1/product/get → Get all products

### 💳 Payment

POST /api/v1/payment/create/:id → Initialize payment

POST /api/v1/payment/success → Payment success callback

POST /api/v1/payment/fail → Payment failed callback

POST /api/v1/payment/cancel → Payment canceled callback

### ⭐ Reviews

POST /api/v1/review/create → Add review

GET /api/v1/review/get → Get all reviews

PATCH /api/v1/review/update/:id → Update review

DELETE /api/v1/review/delete/:id → Delete review

## 🌟 Future Improvements

🖥️ Admin dashboard (React/Next.js frontend)

📊 Advanced analytics & reports

📱 Mobile responsive client UI

🔍 ElasticSearch for advanced product search

📦 Inventory & stock management

# 👨‍💻 Author

Samio Hasan

📧 Email: samiohasan6@gmail.com
