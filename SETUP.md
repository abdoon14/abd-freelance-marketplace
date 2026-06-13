# ABD Freelance Marketplace - Installation & Setup Guide

## Prerequisites

- Node.js 16+ (Download from [nodejs.org](https://nodejs.org))
- MongoDB 4.4+ (Download from [mongodb.com](https://mongodb.com))
- Git (Download from [git-scm.com](https://git-scm.com))
- Code Editor (VS Code recommended)

## Step 1: Clone Repository

```bash
git clone https://github.com/abdoon14/abd-freelance-marketplace.git
cd abd-freelance-marketplace
```

## Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings (see below)
```

### Backend .env Configuration

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/abd-freelance
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
NODE_ENV=development
PLATFORM_COMMISSION=0.10
```

### Start Backend Server

```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

## Step 3: Setup Frontend

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Frontend .env Configuration

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
VITE_APP_NAME=ABD Freelance
VITE_APP_DESCRIPTION=Modern Freelance Marketplace
```

### Start Frontend

```bash
npm run dev
```

Frontend will run on: **http://localhost:3000**

## Step 4: Database Setup

### Option A: Local MongoDB

1. Install MongoDB
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Option B: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in backend `.env`

## Step 5: Email Configuration

### Using Gmail

1. Enable 2-Factor Authentication on Gmail
2. Create App Password:
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Find "App passwords"
   - Create password for Mail app
3. Copy the 16-character password
4. Update `EMAIL_USER` and `EMAIL_PASS` in backend `.env`

## Step 6: Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Update `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

## Verification

### Check Backend

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2026-06-13T23:00:00.000Z"
}
```

### Check Frontend

Open http://localhost:3000 in your browser

## Available Routes

### Frontend Routes

| Path | Description |
|------|-------------|
| `/` | Home page |
| `/browse` | Browse gigs |
| `/gig/:id` | Gig details |
| `/login` | Login page |
| `/signup` | Registration page |
| `/dashboard` | User dashboard |

### Backend API Routes

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/register` | POST | ❌ | Register user |
| `/api/v1/auth/login` | POST | ❌ | Login user |
| `/api/v1/users/profile` | GET | ✅ | Get profile |
| `/api/v1/gigs` | GET | ❌ | List gigs |
| `/api/v1/gigs` | POST | ✅ | Create gig |
| `/api/v1/orders` | POST | ✅ | Create order |
| `/api/v1/payments/history` | GET | ✅ | Payment history |
| `/api/v1/reviews` | POST | ✅ | Create review |

## Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (macOS/Linux)
kill -9 <PID>
```

### MongoDB connection error

```bash
# Verify MongoDB is running
mongosh

# If not running, start it
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Frontend can't connect to backend

1. Check backend is running on port 5000
2. Verify `VITE_API_URL` in frontend `.env`
3. Check CORS settings in backend

## Development Commands

### Backend

```bash
cd backend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Frontend

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
abd-freelance-marketplace/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store & slices
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── config/         # Configuration
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                   # Documentation
├── README.md
└── PROJECT_PLAN.md
```

## Next Steps

1. ✅ Backend & Frontend setup complete
2. 🔜 Create more pages and features
3. 🔜 Implement payment system
4. 🔜 Add real-time messaging
5. 🔜 Deploy to production

## Need Help?

- Check [GitHub Issues](https://github.com/abdoon14/abd-freelance-marketplace/issues)
- Read [API Documentation](./docs/API.md)
- Review [Database Schema](./docs/DATABASE_SCHEMA.md)

---

**Happy Coding! 🚀**
