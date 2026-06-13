# ABD Freelance - Modern Freelance Marketplace

A professional freelance marketplace platform similar to Fiverr, built with modern web technologies.

## Project Overview

ABD Freelance is a comprehensive two-sided marketplace that connects clients with skilled freelancers. The platform features a professional dark theme with gold accents, real-time communication, secure payments, and a robust admin panel.

## Key Features

### For Clients
- Browse and search freelance services by categories
- Hire freelancers with secure payment
- Real-time chat with freelancers
- Leave reviews and ratings
- Order management dashboard
- Responsive design for all devices

### For Freelancers
- Create and manage service offerings (gigs)
- Set custom prices and delivery times
- Receive and manage orders
- Real-time communication with clients
- Earnings tracking and withdrawal
- VIP subscription benefits

### Platform Features
- Dark mode with gold accents (#D4AF37)
- Multi-language support (English, Arabic, Italian)
- Real-time notifications
- Advanced search with filters
- Rating and review system
- Secure payment processing (Stripe)
- Admin dashboard for platform management

## Monetization Model

- **Platform Commission**: 10% on every completed order
- **VIP Subscription** (€4.99/month):
  - Unlimited gigs
  - VIP badge on profile
  - Priority placement in search results
  - No advertisements
- **Featured Gig Promotion**: Pay-per-promotion system
- **Banner Advertisements**: For free tier users

## Tech Stack

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Redux Toolkit (State Management)
- Socket.io-client (Real-time Communication)
- Axios (API Client)
- i18next (Internationalization)

### Backend
- Node.js 16+
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Socket.io (Real-time Communication)
- Stripe API (Payment Processing)
- Nodemailer (Email Notifications)
- Multer (File Uploads)

## Project Structure

```
abd-freelance-marketplace/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   └── App.tsx
│   └── package.json
├── backend/                  # Node.js/Express backend
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── config/
│   │   └── server.ts
│   └── package.json
├── admin-dashboard/          # Admin panel (React app)
├── docs/                     # Documentation
├── .gitignore
├── README.md
└── PROJECT_PLAN.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/abdoon14/abd-freelance-marketplace.git
cd abd-freelance-marketplace
```

2. Set up Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. Set up Frontend (in another terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/abd-freelance
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_KEY=your_stripe_publishable_key
```

## Documentation

- [Project Plan](./PROJECT_PLAN.md) - Development timeline and phases
- [API Documentation](./docs/API.md) - Backend API endpoints
- [Database Schema](./docs/DATABASE_SCHEMA.md) - MongoDB collections and schemas
- [Architecture](./docs/ARCHITECTURE.md) - System architecture overview

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Meaningful commit messages

### Git Workflow
```bash
git checkout -b feature/feature-name
git commit -m "feat: add new feature"
git push origin feature/feature-name
# Create Pull Request
```

## Deployment

### Backend Deployment
- AWS EC2 / Heroku / DigitalOcean
- MongoDB Atlas for database
- Environment variables for secrets

### Frontend Deployment
- Vercel / Netlify
- Build: `npm run build`
- Deploy from `build/` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For support, email support@abdfreelance.com or open an issue on GitHub.

## Author

ABD Freelance Team

---

**Last Updated**: June 2026
**Version**: 1.0.0-alpha
