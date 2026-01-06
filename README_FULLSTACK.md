# Future Store - Full Stack E-Commerce App

A modern e-commerce solution built with **NestJS** (Backend) and **Next.js** (Frontend).

## Tech Stack
- **Frontend**: Next.js 15+, TypeScript, Tailwind CSS, Stripe Elements
- **Backend**: NestJS, Mongoose, Passport (OAuth), Stripe API
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally
- Stripe Account (for Test Keys)
- Google/Facebook Developer Accounts (for OAuth Keys)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in `backend/` root with the following variables:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/pragra-assignment
    JWT_SECRET=your_jwt_secret_key
    
    # OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    FACEBOOK_APP_ID=your_facebook_app_id
    FACEBOOK_APP_SECRET=your_facebook_app_secret
    
    # Payments
    STRIPE_SECRET_KEY=sk_test_your_stripe_key
    
    # Email (Optional)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    ```
4.  Start the server:
    ```bash
    npm run start:dev
    ```
5.  Seed the database with dummy products:
    ```bash
    curl -X POST http://localhost:3000/products/seed
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) (or port 3001 if 3000 is taken).

## Features Implemented
- **User Auth**: Email/Password + Google & Facebook OAuth.
- **Products**: Dynamic listing of seeded products.
- **Cart**: Client-side cart management with Context API.
- **Checkout**: Secure payment intent creation and confirmation with Stripe.
- **Orders**: automatic order creation in backend after successful payment.

## API Endpoints (Backend)
- `GET /products`: List all products
- `POST /products/seed`: Seed dummy products
- `POST /auth/signup`: Create account
- `POST /auth/login`: Login
- `GET /auth/google`: Google OAuth
- `POST /payments/create-intent`: Create Stripe PaymentIntent
- `POST /orders`: Create new order
