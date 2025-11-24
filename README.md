# Luxury Fitness - Full Stack Application

A premium fitness platform built with React frontend and MySQL backend, featuring membership management, workout programs, trainer profiles, and booking systems.

## Project Structure

```
finess/
├── backend/                 # Node.js/Express Backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── routes/            # API routes
│   ├── database/          # MySQL schema
│   └── server.js          # Express server entry point
│
└── frontend/              # React Frontend
    ├── src/
    │   ├── api/          # Axios configuration
    │   ├── components/   # Reusable components (Navbar, Footer)
    │   ├── context/      # Auth context
    │   ├── pages/        # Page components
    │   └── index.css     # Luxury design system
    └── index.html        # HTML entry point
```

## Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MySQL 8.0+
- **Authentication**: JWT with bcrypt
- **Validation**: express-validator
- **CORS**: cors middleware

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS (Luxury Design System)
- **Animations**: Framer Motion
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=luxury_fitness
JWT_SECRET=your_secret_key
```

5. Create database and import schema:
```bash
mysql -u root -p < database/schema.sql
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features

### Core Features
✅ User Authentication (JWT-based)
✅ Membership Plans (Basic, Premium, Elite)
✅ Workout Programs Library
✅ Trainer Profiles
✅ Class Scheduling
✅ Booking System
✅ User Dashboard
✅ Responsive Design

### Design Features
- **Luxury Color Palette**: Gold (#D4AF37) and Deep Black (#1A1A1D)
- **Glassmorphism Effects**: Backdrop blur and transparency
- **Premium Typography**: Playfair Display + Inter
- **Smooth Animations**: Framer Motion transitions
- **Mobile Responsive**: Fully responsive across all devices

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Memberships
- `GET /api/memberships` - Get all membership plans
- `GET /api/memberships/:id` - Get single membership
- `POST /api/memberships/subscribe` - Subscribe to plan (protected)
- `GET /api/memberships/my/subscription` - Get user's subscription (protected)

### Workouts
- `GET /api/workouts` - Get all workouts (with filters)
- `GET /api/workouts/:id` - Get single workout
- `GET /api/workouts/meta/categories` - Get workout categories

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get single trainer

### Classes
- `GET /api/classes` - Get all classes (with filters)
- `GET /api/classes/:id` - Get single class

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `DELETE /api/bookings/:id` - Cancel booking (protected)

## Database Schema

The application uses 8 main tables:
- `users` - User accounts with role-based access
- `memberships` - Subscription plans
- `user_memberships` - Active user subscriptions
- `trainers` - Trainer profiles
- `workouts` - Workout programs
- `classes` - Scheduled fitness classes
- `bookings` - User bookings
- `payments` - Transaction history

## Development

### Running in Development Mode

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

## Design System

The application uses a comprehensive luxury design system with:

### Colors
- Primary Gold: `#D4AF37`
- Deep Black: `#1A1A1D`
- Accent Champagne: `#C9A961`

### Typography
- Display Font: Playfair Display (luxury serif)
- Body Font: Inter (modern sans-serif)

### Components
- Glassmorphism cards with backdrop blur
- Gradient buttons with ripple effects
- Smooth page transitions
- Responsive navigation
- Premium form inputs

## License

This project is private and proprietary.

## Support

For support, contact info@luxuryfitness.com
