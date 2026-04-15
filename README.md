# Hospital Booking System

A comprehensive hospital appointment management system built with React, Express, and MySQL.

## Features

### Patient Features
- User registration and authentication
- Browse available doctors
- Book appointmenpts with doctors
- View and manage appointments
- Cancel appointments
- Professional minimalist UI

### Doctor Features
- View all scheduled appointments
- Manage appointment status (pending, confirmed, completed, cancelled)
- See patient details
- Track appointment statistics

### Admin Features
- Create doctor accounts and provide credentials
- View all users
- Manage all appointments across the system
- View system statistics (patients, doctors, appointments)
- Delete users
- Complete oversight of system operations

## Tech Stack used

### Backend
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Dependencies**: cors, nodemon

### Frontend
- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Design**: Minimalist, professional UI with slate colors

## Project Structure

```
hospital_booking_system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Patient.js
│   │   └── Appointment.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleMiddleware.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── PatientDashboard.jsx
    │   │   ├── BookAppointment.jsx
    │   │   ├── DoctorDashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── ManageUsers.jsx
    │   │   ├── ViewAppointments.jsx
    │   │   └── CreateDoctor.jsx
    │   ├── utils/
    │   │   ├── api.js
    │   │   ├── auth.js
    │   │   ├── helpers.js
    │   │   └── ProtectedRoute.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL Server running
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create MySQL database**
   ```sql
   CREATE DATABASE hospital_db;
   ```

4. **Update database connection** (in `config/db.js`)
   - Change username/password if needed
   - Default: `root` user with no password

5. **Start backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register as patient
- `POST /api/auth/login` - Login

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors/create` - Create doctor (admin only)
- `PUT /api/doctors/profile` - Update doctor profile (doctor only)

### Appointments
- `POST /api/appointments/book` - Book appointment (patient only)
- `GET /api/appointments/patient` - Get patient's appointments
- `GET /api/appointments/doctor` - Get doctor's appointments
- `PUT /api/appointments/:id/status` - Update appointment status (doctor/admin)
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/statistics` - Get system statistics
- `DELETE /api/admin/users/:id` - Delete user

## Default Test Credentials

### Admin Account (Create in database manually or use create doctor endpoint)
```
Email: admin@hospital.com
Password: admin123
Role: admin
```

## Features Implemented

✅ Patient registration and login
✅ Doctor browsing and appointment booking
✅ Appointment status management
✅ Admin user management
✅ Doctor account creation by admin
✅ JWT-based authentication
✅ Role-based access control
✅ Responsive design
✅ Minimalist professional UI
✅ Error handling
✅ Form validation
✅ Protected routes

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based middleware protection
- CORS enabled
- Request validation

## Performance Optimizations

- Minimal dependencies
- Efficient component structure
- Lazy loading capabilities
- Optimized SQL queries
- Resource-efficient styling

## Database Schema

### Users Table
- id (PK)
- name
- email (unique)
- password (hashed)
- role (admin, doctor, patient)
- phone
- createdAt, updatedAt

### Doctors Table
- id (PK)
- userId (FK to Users)
- specialization
- bio
- availability (JSON)

### Patients Table
- id (PK)
- userId (FK to Users)
- dob
- gender
- address

### Appointments Table
- id (PK)
- patientId (FK to Patients)
- doctorId (FK to Doctors)
- appointmentDate
- reason
- status (pending, confirmed, completed, cancelled)

## Styling

The application uses a professional minimalist design:
- Slate color palette (#1e293b primary)
- Clean borders and minimal shadows
- Responsive grid layouts
- Accessible form controls
- Smooth transitions

## Next Steps for Enhancement

- Email notifications
- Appointment reminders
- Doctor availability scheduling
- Patient medical history
- Prescription management
- Payment integration
- Real-time notifications
- Advanced filtering and search
