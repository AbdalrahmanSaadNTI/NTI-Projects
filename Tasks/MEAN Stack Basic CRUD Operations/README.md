# MEAN Stack CRUD Application

A simple web application built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) that allows users to perform basic Create, Read, Update, and Delete (CRUD) operations on tasks.

## Features

- Create new tasks with title and description
- View all tasks in a list
- Update existing tasks
- Delete tasks
- Mark tasks as completed/incomplete
- Simple and clean user interface

---

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

### Required Software

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - This will also install npm (Node Package Manager)
   - Verify installation: Open terminal/command prompt and run:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB** (Community Edition)
   - Download from: https://www.mongodb.com/try/download/community
   - Choose the appropriate version for your operating system
   - Follow the installation wizard
   - **Note**: MongoDB typically runs as a service on Windows, or you can start it manually

3. **Git** (optional, for cloning repositories)
   - Download from: https://git-scm.com/downloads

---

## Installation Guide

### Step 1: Install MongoDB

#### Windows:
1. Download MongoDB Community Server from the official website
2. Run the installer and follow the setup wizard
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service (recommended)
5. MongoDB will start automatically after installation

**Verify MongoDB is running:**
- Open Services (Windows Key + R, type `services.msc`)
- Look for "MongoDB" service and ensure it's running
- Or open Command Prompt and run:
  ```bash
  mongod --version
  ```

#### macOS:
1. Download MongoDB Community Server
2. Extract the archive
3. Move MongoDB to your desired location (e.g., `/usr/local/mongodb`)
4. Create data directory:
   ```bash
   sudo mkdir -p /data/db
   sudo chown -R $(whoami) /data/db
   ```
5. Start MongoDB:
   ```bash
   mongod
   ```

#### Linux:
1. Follow MongoDB installation guide for your distribution: https://docs.mongodb.com/manual/installation/
2. Start MongoDB service:
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

### Step 2: Clone or Extract the Project

If you have the project as a ZIP file:
1. Extract the ZIP file to your desired location
2. Navigate to the extracted folder

If you have a Git repository:
```bash
git clone <repository-url>
cd "MEAN Stack Basic CRUD Operations"
```

### Step 3: Backend Setup

1. **Open a terminal/command prompt** and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages (Express, Mongoose, CORS, etc.)
   - Wait for the installation to complete (may take 1-2 minutes)
   - You should see a `node_modules` folder created

3. **Create environment configuration file:**
   - Create a new file named `.env` in the `backend` directory
   - Add the following content:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/mean-crud
     ```
   - **Note**: If using MongoDB Atlas or a remote MongoDB instance, replace `MONGODB_URI` with your connection string
   - **Example for MongoDB Atlas:**
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mean-crud
     ```

### Step 4: Frontend Setup

1. **Open a NEW terminal/command prompt** (keep the backend terminal open)

2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```
   This will install Angular and all required packages
   - Wait for the installation to complete (may take 3-5 minutes)
   - You should see a `node_modules` folder created

---

## Running the Application

The application requires **three components** to be running simultaneously:
1. MongoDB database
2. Backend server (Express.js)
3. Frontend server (Angular)

You will need **three separate terminal/command prompt windows**.

### Terminal 1: Start MongoDB

#### Windows (if not running as service):
```bash
mongod
```

#### macOS/Linux:
```bash
mongod
```

**Verify MongoDB is running:**
- You should see messages like "waiting for connections on port 27017"
- If MongoDB is installed as a service (Windows), it should already be running

### Terminal 2: Start Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   npm start
   ```

   Or for development mode with auto-reload:
   ```bash
   npm run dev
   ```

3. **Verify backend is running:**
   - You should see: `Server is running on port 3000`
   - You should see: `Connected to MongoDB`
   - If you see connection errors, check that MongoDB is running

4. **Test the backend API:**
   - Open your browser and go to: `http://localhost:3000/api/tasks`
   - You should see an empty array: `[]`
   - This confirms the backend is working correctly

### Terminal 3: Start Frontend Application

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the Angular development server:
   ```bash
   npm start
   ```

   This will automatically open your browser, or you can manually navigate to the URL shown.

3. **Verify frontend is running:**
   - You should see: `** Angular Live Development Server is listening on localhost:4200 **`
   - The application will automatically open in your browser at `http://localhost:4200`
   - If it doesn't open automatically, manually navigate to: `http://localhost:4200`

### Access the Application

Once all three components are running:
- Open your web browser
- Navigate to: **http://localhost:4200**
- You should see the Task Manager application

---

## Quick Start Summary

For experienced users, here's the quick command sequence:

```bash
# Terminal 1: MongoDB (if not running as service)
mongod

# Terminal 2: Backend
cd backend
npm install
npm start

# Terminal 3: Frontend
cd frontend
npm install
npm start
```

Then open: **http://localhost:4200**

---

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example API Usage

**Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description","completed":false}'
```

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

---

## Usage Guide

### Creating a Task
1. Enter a task title in the "Title" field (required)
2. Optionally enter a description
3. Check "Completed" if the task is already done
4. Click "Create Task"

### Viewing Tasks
- All tasks are displayed in a list below the form
- Tasks show their status (Completed/Pending)
- Completed tasks appear with reduced opacity

### Editing a Task
1. Click the "Edit" button on any task
2. The form will populate with the task details
3. Modify the fields as needed
4. Click "Update Task" to save changes
5. Click "Cancel" to discard changes

### Deleting a Task
1. Click the "Delete" button on any task
2. Confirm the deletion in the popup dialog
3. The task will be permanently removed

### Marking Tasks Complete/Incomplete
1. Click "Mark Complete" on a pending task
2. Click "Mark Incomplete" on a completed task
3. The status updates immediately

---

## Project Structure

```
MEAN Stack Basic CRUD Operations/
│
├── backend/
│   ├── server.js              # Express server and API routes
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (create this)
│   └── .gitignore            # Git ignore file
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts      # Main component logic
│   │   │   ├── app.component.html    # Main template
│   │   │   ├── app.component.css     # Component styles
│   │   │   ├── app.module.ts         # Angular module
│   │   │   └── task.service.ts       # API service
│   │   ├── assets/                   # Static assets
│   │   ├── styles.css                # Global styles
│   │   ├── index.html                # HTML entry point
│   │   └── main.ts                   # Application bootstrap
│   ├── angular.json                  # Angular configuration
│   ├── package.json                  # Frontend dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   └── .gitignore                   # Git ignore file
│
└── README.md                         # This file
```

---

## Troubleshooting

### Issue: MongoDB Connection Error

**Symptoms:**
- Backend shows: `MongoDB connection error`
- Error: `MongooseServerSelectionError`

**Solutions:**
1. **Verify MongoDB is running:**
   - Windows: Check Services (services.msc) for MongoDB service
   - macOS/Linux: Run `mongod` in terminal
   - Check if MongoDB is listening on port 27017

2. **Check connection string:**
   - Verify the `MONGODB_URI` in `backend/.env` file
   - Default should be: `mongodb://localhost:27017/mean-crud`

3. **Firewall issues:**
   - Ensure port 27017 is not blocked by firewall
   - Allow MongoDB through Windows Firewall if needed

4. **MongoDB not installed:**
   - Reinstall MongoDB following the installation guide above

### Issue: Port Already in Use

**Symptoms:**
- Error: `EADDRINUSE: address already in use :::3000`
- Error: `Port 4200 is already in use`

**Solutions:**

**Backend (Port 3000):**
1. Find and close the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   ```
2. Or change the port in `backend/.env`:
   ```
   PORT=3001
   ```
3. Update frontend service URL in `frontend/src/app/task.service.ts`:
   ```typescript
   private apiUrl = 'http://localhost:3001/api/tasks';
   ```

**Frontend (Port 4200):**
1. Use a different port:
   ```bash
   npm start -- --port 4201
   ```
2. Or update `angular.json` serve configuration

### Issue: 'ng' is not recognized

**Symptoms:**
- Error: `'ng' is not recognized as an internal or external command`

**Solution:**
- Use `npm start` instead of `ng serve`
- The project is configured to use `npx ng` automatically
- No need to install Angular CLI globally

### Issue: Module Not Found Errors

**Symptoms:**
- Error: `Cannot find module '@angular/...'`
- Error: `Module not found`

**Solutions:**
1. Delete `node_modules` folder:
   ```bash
   rm -rf node_modules
   # Windows: rmdir /s /q node_modules
   ```

2. Delete package lock file:
   ```bash
   rm package-lock.json
   # Windows: del package-lock.json
   ```

3. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

4. Reinstall dependencies:
   ```bash
   npm install
   ```

### Issue: CORS Errors

**Symptoms:**
- Browser console shows: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**
1. Ensure backend server is running on port 3000
2. Verify frontend is making requests to `http://localhost:3000`
3. Check `backend/server.js` has CORS middleware enabled
4. Clear browser cache and reload

### Issue: Angular Build Errors

**Symptoms:**
- Schema validation errors
- TypeScript compilation errors

**Solutions:**
1. Verify Node.js version (should be 14+):
   ```bash
   node --version
   ```

2. Update Angular CLI and dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Clear Angular cache:
   ```bash
   rm -rf .angular
   # Windows: rmdir /s /q .angular
   ```

### Issue: Tasks Not Saving

**Symptoms:**
- Tasks appear but disappear after refresh
- Backend shows connection errors

**Solutions:**
1. Verify MongoDB is running and connected
2. Check backend console for errors
3. Verify `.env` file exists in backend directory
4. Check browser console for API errors

### General Debugging Tips

1. **Check all three terminals:**
   - MongoDB terminal should show connection logs
   - Backend terminal should show "Connected to MongoDB"
   - Frontend terminal should show compilation success

2. **Browser Developer Tools:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed API requests

3. **Verify URLs:**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:3000/api/tasks`

4. **Restart services:**
   - Stop all terminals (Ctrl+C)
   - Restart MongoDB
   - Restart backend
   - Restart frontend

---

## Production Deployment

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```
This creates an optimized build in `frontend/dist/mean-crud-frontend/`

**Backend:**
The backend can be run with:
```bash
cd backend
npm start
```

### Environment Variables for Production

Update `backend/.env` for production:
```
PORT=3000
MONGODB_URI=mongodb://your-production-db:27017/mean-crud
NODE_ENV=production
```

### Deploying Frontend

The built frontend files can be served by:
- Any static file server (nginx, Apache)
- Node.js server (Express static files)
- Cloud hosting (Netlify, Vercel, AWS S3)

### Deploying Backend

The backend can be deployed to:
- Heroku
- AWS EC2
- DigitalOcean
- Azure App Service
- Any Node.js hosting platform

---

## Technologies Used

- **MongoDB**: NoSQL database for storing tasks
- **Express.js**: Web framework for Node.js
- **Angular**: Frontend framework for building user interfaces
- **Node.js**: JavaScript runtime environment
- **Mongoose**: MongoDB object modeling for Node.js
- **TypeScript**: Typed superset of JavaScript
- **CORS**: Cross-Origin Resource Sharing middleware

---

## Support

If you encounter any issues not covered in this guide:

1. Check the Troubleshooting section above
2. Verify all prerequisites are installed correctly
3. Ensure all three services (MongoDB, Backend, Frontend) are running
4. Check browser console and terminal outputs for error messages
5. Verify network connectivity and firewall settings

---

## License

This project is open source and available for educational purposes.

---

## Version Information

- Node.js: v14 or higher
- Angular: v16.2.0
- Express: v4.18.2
- MongoDB: Latest Community Edition
- Mongoose: v7.5.0

---

**Last Updated:** December 2024
