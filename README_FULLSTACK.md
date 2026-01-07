# Future Store - Full Stack E-Commerce Application

A modern, scalable e-commerce platform built with **NestJS** (Backend) and **Next.js** (Frontend).

## 🚀 Features

### ✅ User Authentication (Robust & Secure)
- **Sign Up/Login**: Email & Password authentication with secure hashing (Bcrypt).
- **Email Verification**: Users receive a verification link to activate their account.
- **OAuth Integration**: One-click login with **Google**.
- **Session Management**: JWT-based access tokens with strict ownership validation (Cart Privacy).

### 🛍️ Shopping Experience
- **Product Catalog**: dynamic product listing with images, prices, and descriptions.
- **Smart Cart**:
    - **Guest Cart**: Persistent local storage cart for unauthenticated users.
    - **User Cart**: Database-backed cart for logged-in users.
- **My Orders**: Dedicated page for users to view their purchase history.

### 💳 Payments & Orders
- **Stripe Integration**: Secure payment processing with Stripe Elements.
- **Order Management**: Automatic order creation upon successful payment w/ detailed shipping info.
- **Testing** :  You can check by entering the test card details provided by Stripe. and also you can check the order history in the My Orders page.


---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API (Auth & Cart)
- **Payments**: @stripe/react-stripe-js

### Backend
- **Framework**: NestJS
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Passport.js (JWT, Google, Facebook strategies)
- **Email**: Nodemailer (Gmail SMTP)
- **Validation**: Class-validator & DTOs

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)
- Stripe Account (for Test API Keys)
- Google Cloud Project (for OAuth)

### 1️⃣ Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend/` root directory:
    ```env
    # Database
    MONGO_URI=mongodb://127.0.0.1:27017/future-store
    
    # Security
    JWT_SECRET=your_super_secret_jwt_key
    
    # Frontend URL (for CORS and redirects)
    FRONTEND_URL=http://localhost:3000
    BACKEND_URL=http://localhost:5000
    
    # OAuth - Google
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    
    # OAuth - Facebook
    FACEBOOK_APP_ID=your_facebook_app_id
    FACEBOOK_APP_SECRET=your_facebook_app_secret
    
    # Payments
    STRIPE_SECRET_KEY=sk_test_...
    
    # Email Service (Gmail)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_specific_password
    ```
4.  Start the backend server:
    ```bash
    npm run start:dev
    ```
    *Server will start on `http://localhost:5000`*

### 2️⃣ Frontend Setup
1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the `frontend/` root directory:
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
    ```
4.  Start the frontend:
    ```bash
    npm run dev
    ```
    *App will be available at `http://localhost:3000`*

### 3️⃣ Seeding Data
Populate your database with dummy products:
```bash
curl -X POST http://localhost:5000/products/seed
```

---

## 🔍 API Endpoints

### Auth
- `POST /auth/signup`: Register new user
- `POST /auth/login`: Authenticate user
- `GET /auth/verify?token=...`: Verify email
- `GET /auth/google`: Trigger Google Login

### Products
- `GET /products`: Fetch all products
- `GET /products/:id`: Fetch single product

### Cart
- `GET /cart`: Get user cart
- `POST /cart/add`: Add item to cart
- `DELETE /cart/remove/:productId`: Remove item

### Orders
- `POST /orders`: Create new order
- `GET /orders/my-orders/:userId`: Get user history

---
