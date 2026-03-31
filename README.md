# 🤖 UGC.AI - AI-Powered UGC Ad Generator

**UGC.AI** is a high-performance, full-stack application designed to generate professional User-Generated Content (UGC) ads in seconds. By leveraging AI, the platform allows creators to transform product images and model photos into social-ready lifestyle imagery and short-form videos.

---

## 🔗 Live Demo

**Experience the app live here:** [https://friendly-exploration-production-e98a.up.railway.app](https://friendly-exploration-production-e98a.up.railway.app)

-----

## 🚀 Features

* **AI Generation**: Seamless integration with Google Gemini AI for intelligent content creation.
* **Secure Authentication**: User management and protected routes powered by Clerk.
* **Dynamic Credits System**: Real-time credit tracking to manage user usage.
* **Community Gallery**: A public space to explore and showcase published UGC projects.
* **Media Management**: Robust image and video handling using Cloudinary and Multer.
* **Modern UI/UX**: Built with React 19, Tailwind CSS 4, and Framer Motion for smooth animations.

---

## 🛠️ Tech Stack

### Frontend
* **Framework**: React 19 (TypeScript)
* **Styling**: Tailwind CSS v4
* **State & Auth**: Clerk React
* **Animations**: Framer Motion & Lenis (Smooth Scroll)
* **Routing**: React Router DOM v7

### Backend
* **Runtime**: Node.js with Express v5
* **Database**: PostgreSQL with Prisma ORM
* **AI Engine**: Google Generative AI (Gemini)
* **Storage**: Cloudinary
* **Monitoring**: Sentry

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ayaazworks/UGC---Project.git
cd UGC---Project
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   DATABASE_URL="your_postgresql_url"
   DIRECT_URL="your_direct_url"
   CLERK_PUBLISHABLE_KEY="your_clerk_pub_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   CLERK_WEBHOOK_SIGNING_SECRET="your_clerk_webhook_signing_secret"
   CLOUDINARY_URL="your_cloudinary_url"
   GOOGLE_CLOUD_API_KEY="your_gemini_api_key"
   ```
4. Initialize Prisma:
   ```bash
   npx prisma generate
   ```
5. Start the server:
   ```bash
   npm run server
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY="your_clerk_pub_key"
   VITE_BASEURL="your_backend_url"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
├── client/                # React + Vite Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route views (Home, Create, Community)
│   │   ├── configs/       # Axios setup
│   │   ├── assets/        # Images and icons
│   │   └── types/         # Important Interfaces
├── server/                # Express + Prisma Backend
│   ├── controllers/       # Business logic (User, Projects, Clerk Webhooks)
│   ├── configs/           # Ai, Prisma, Multer and Sentry Setup
│   ├── routes/            # API Endpoints
│   ├── middlewares/       # Auth protection and Multer configs
│   ├── prisma/            # Database schema
│   ├── types/             # Express Data Types
│   └── server.ts          # Entry point and clerk configs

```

## 📄 License
This project is licensed under the **ISC License**.
