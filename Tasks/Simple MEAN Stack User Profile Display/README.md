# MEAN Stack User Profile Display

A simple web application using the MEAN stack to display a pre-defined list of user profiles. The Express.js backend serves static user data via API, and the Angular frontend displays it in a clear, unstyled list.

## Project Structure

```
.
├── backend/          # Express.js backend
│   ├── server.js    # Express server with API endpoint
│   └── package.json
├── frontend/        # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   └── user-list/
│   │   │       └── user-list.component.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### 1. Node.js and npm

- **Download Node.js**: Visit [https://nodejs.org/](https://nodejs.org/)
- **Recommended Version**: Node.js v16 or higher (includes npm)
- **Installation**: 
  - Download the LTS (Long Term Support) version for your operating system
  - Run the installer and follow the installation wizard
  - Accept all default settings

### 2. Verify Installation

Open a terminal/command prompt and verify the installations:

```bash
node --version
npm --version
```

You should see version numbers displayed (e.g., `v18.17.0` and `9.6.7`).

---

## Complete Setup and Build Instructions

### Step 1: Extract/Clone the Project

1. Extract the project folder to your desired location (if it's a zip file)
2. Open a terminal/command prompt
3. Navigate to the project root directory:
   ```bash
   cd "path/to/Simple MEAN Stack User Profile Display"
   ```

### Step 2: Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages (Express.js, CORS, etc.). This may take 1-2 minutes.

3. **Verify installation:**
   You should see a `node_modules` folder created in the backend directory.

### Step 3: Frontend Setup

1. **Open a NEW terminal/command prompt window** (keep the backend terminal open)

2. **Navigate to the frontend directory:**
   ```bash
   cd "path/to/Simple MEAN Stack User Profile Display/frontend"
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```
   This will install Angular and all required packages. This may take 3-5 minutes as Angular has many dependencies.

4. **Verify installation:**
   You should see a `node_modules` folder created in the frontend directory.

---

## Running the Application

### Step 1: Start the Backend Server

1. In your first terminal window, navigate to the backend directory (if not already there):
   ```bash
   cd backend
   ```

2. **Start the Express server:**
   ```bash
   npm start
   ```

3. **Expected output:**
   ```
   Server is running on http://localhost:3000
   ```

4. **Keep this terminal window open** - the server must remain running.

### Step 2: Start the Frontend Server

1. In your second terminal window, navigate to the frontend directory (if not already there):
   ```bash
   cd frontend
   ```

2. **Start the Angular development server:**
   ```bash
   npm start
   ```

3. **Expected output:**
   ```
   ** Angular Live Development Server is listening on localhost:4200 **
   ```

4. **The browser should automatically open** to `http://localhost:4200`
   - If it doesn't open automatically, manually navigate to: `http://localhost:4200`

5. **Keep this terminal window open** - the frontend server must remain running.

### Step 3: View the Application

1. Open your web browser
2. Navigate to: `http://localhost:4200`
3. You should see:
   - A heading "User Profiles"
   - A heading "User List"
   - A list of 5 user profiles with Name, Email, and Bio

---

## Verifying Everything Works

### Test the Backend API

1. Open a new browser tab
2. Navigate to: `http://localhost:3000/api/users`
3. You should see JSON data with 5 user profiles

### Test the Frontend

1. Navigate to: `http://localhost:4200`
2. You should see the user profiles displayed in a list format

---

## Modifying User Data

To change the user profiles displayed:

1. **Open the file:** `backend/server.js`
2. **Locate the `userProfiles` array** (around line 10)
3. **Edit the user data** as needed:
   ```javascript
   const userProfiles = [
     {
       id: 1,
       name: 'Your Name Here',
       email: 'your.email@example.com',
       bio: 'Your bio description here'
     },
     // Add or modify more users...
   ];
   ```
4. **Save the file**
5. **Restart the backend server:**
   - In the backend terminal, press `Ctrl + C` to stop the server
   - Run `npm start` again

---

## Troubleshooting

### Issue: "npm is not recognized"
**Solution:** Node.js is not installed or not in your PATH. Reinstall Node.js and restart your terminal.

### Issue: "Port 3000 already in use"
**Solution:** Another application is using port 3000. Either:
- Close the other application, OR
- Change the port in `backend/server.js` (line 4) to a different number (e.g., 3001)

### Issue: "Port 4200 already in use"
**Solution:** Another Angular app is running. Either:
- Close the other Angular app, OR
- Angular will automatically use the next available port (4201, 4202, etc.)

### Issue: "Cannot GET /api/users" or Frontend shows no data
**Solution:** 
- Ensure the backend server is running on port 3000
- Check that you can access `http://localhost:3000/api/users` directly in the browser
- Verify CORS is enabled (it should be by default)

### Issue: Frontend shows errors in browser console
**Solution:**
- Ensure both servers are running
- Check that the backend is accessible at `http://localhost:3000`
- Clear browser cache and refresh the page

### Issue: "npm install" fails
**Solution:**
- Check your internet connection
- Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again
- Ensure you have the latest version of npm: `npm install -g npm@latest`

---

## Stopping the Application

1. **Stop the frontend server:**
   - In the frontend terminal, press `Ctrl + C`

2. **Stop the backend server:**
   - In the backend terminal, press `Ctrl + C`

---

## API Endpoint

- **URL:** `http://localhost:3000/api/users`
- **Method:** GET
- **Response:** JSON array of user profiles
- **Example Response:**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "bio": "Software engineer with 5 years of experience..."
    }
  ]
  ```

---

## Features

- ✅ Express.js backend serving static user data
- ✅ Angular frontend fetching and displaying user profiles
- ✅ CORS enabled for frontend-backend communication
- ✅ No database or data persistence (static data only)
- ✅ Simple, unstyled list display
- ✅ Easy to modify user data in `backend/server.js`

---

## Technical Details

- **Backend Framework:** Express.js 4.18.2
- **Frontend Framework:** Angular 16.2.0
- **Backend Port:** 3000
- **Frontend Port:** 4200
- **Data Storage:** Static array in `backend/server.js` (no database)

---

## Support

If you encounter any issues not covered in this guide:
1. Check that all prerequisites are installed correctly
2. Verify both servers are running
3. Check browser console for errors (F12 → Console tab)
4. Ensure no firewall is blocking ports 3000 and 4200
5. Talk to me to support
