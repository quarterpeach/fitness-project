# Quick Start Guide - Luxury Fitness

## 🚀 Quick Setup (5 minutes)

### Step 1: Database Setup

Open your terminal and run:

```bash
# Create the database
mysql -u root -p
```

Then in MySQL:
```sql
CREATE DATABASE luxury_fitness;
USE luxury_fitness;
SOURCE /Users/didsarinchantharaintorn/finess/backend/database/schema.sql;
SOURCE /Users/didsarinchantharaintorn/finess/backend/database/sample-data.sql;
exit;
```

### Step 2: Configure Backend

Update `backend/.env` file with your MySQL password:
```env
DB_PASSWORD=your_mysql_password_here
```

### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
cd /Users/didsarinchantharaintorn/finess/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/didsarinchantharaintorn/finess/frontend
npm run dev
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Demo Credentials

- **Email**: demo@luxuryfitness.com
- **Password**: demo123

## ✨ Features to Explore

1. **Home Page** - Luxury landing page with hero section
2. **Memberships** - Premium pricing tiers (Basic, Premium, Elite)
3. **Workouts** - Browse workout programs with filters
4. **Trainers** - View expert trainer profiles
5. **Classes** - Check upcoming group fitness classes
6. **Dashboard** - User profile and booking management

## 🎨 Design Highlights

- **Glassmorphism Effects** - Modern translucent card designs
- **Luxury Color Palette** - Gold (#D4AF37) & Deep Black (#1A1A1D)
- **Smooth Animations** - Framer Motion powered transitions
- **Fully Responsive** - Mobile-first design approach
- **Premium Typography** - Playfair Display + Inter fonts

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with features & previews |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Memberships | `/memberships` | View & subscribe to plans |
| Workouts | `/workouts` | Browse workout programs |
| Trainers | `/trainers` | View trainer profiles |
| Classes | `/classes` | Upcoming group classes |
| Dashboard | `/dashboard` | User account & bookings |

## 🛠️ Troubleshooting

**Database Connection Error:**
- Ensure MySQL is running: `mysql.server status`
- Check credentials in `backend/.env`
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

**Port Already in Use:**
- Backend (5000): Change PORT in `backend/.env`
- Frontend (5173): Vite will auto-assign next available port

**Module Not Found:**
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

## 📊 API Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get memberships
curl http://localhost:5000/api/memberships

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@luxuryfitness.com","password":"demo123"}'
```

## 🎯 Development Workflow

1. Make changes to frontend code → Hot reload active
2. Make changes to backend code → Auto-restart with nodemon
3. Database changes → Run migrations/updates in MySQL
4. Test features → Use browser DevTools & Network tab

## 📝 Next Steps

- [ ] Set up MySQL database
- [ ] Configure backend/.env
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Register/login to explore features
- [ ] Subscribe to a membership
- [ ] Book a class
- [ ] View dashboard

Enjoy building with Luxury Fitness! 🏋️‍♂️✨
