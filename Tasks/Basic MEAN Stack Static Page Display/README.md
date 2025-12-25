# MEAN Stack Static Page Display

A simple MEAN stack application that displays static text and images. This project demonstrates the basic setup and integration of MongoDB, Express, Angular, and Node.js without requiring database interaction or complex routing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation by running in terminal/command prompt:
     ```bash
     node --version
     ```
   - You should see a version number (e.g., v18.17.0 or higher)

2. **npm** (Node Package Manager - comes with Node.js)
   - Verify installation:
     ```bash
     npm --version
     ```
   - You should see a version number (e.g., 9.6.7 or higher)

### System Requirements

- Windows 10/11, macOS, or Linux
- At least 500MB free disk space
- Internet connection (for downloading dependencies)

---

## 🚀 Complete Setup and Build Instructions

Follow these steps in order to set up and run the application:

### Step 1: Navigate to Project Directory

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and navigate to the project root directory:

```bash
cd "D:\Others\Study\Freelancing\Tasks\Basic MEAN Stack Static Page Display"
```

*Note: Replace the path above with your actual project path.*

### Step 2: Install Backend Dependencies

Install all Node.js/Express dependencies:

```bash
npm install
```

**Expected output:** You should see npm downloading and installing packages. This may take 2-5 minutes. Wait until you see a message indicating successful installation.

**What this does:** Installs Express server and other backend dependencies listed in `package.json`.

### Step 3: Install Frontend Dependencies

Navigate to the Angular app directory and install Angular dependencies:

```bash
cd angular-app
npm install
cd ..
```

**Expected output:** Similar to Step 2, npm will download Angular and related packages. This may take 5-10 minutes as Angular has many dependencies.

**What this does:** Installs Angular framework, TypeScript compiler, and all frontend dependencies.

**Alternative (One Command):** You can also use the convenience script from the root directory:
```bash
npm run install-all
```

### Step 4: Build the Angular Application

Build the Angular frontend application for production:

```bash
cd angular-app
npm run build
cd ..
```

**Expected output:** You should see:
```
✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.
```

**What this does:** 
- Compiles TypeScript to JavaScript
- Bundles all Angular code
- Copies assets (images, styles) to the `dist` folder
- Creates optimized production-ready files

**Important:** This step must be completed before running the server. The server serves files from the `angular-app/dist/angular-app` folder.

### Step 5: Start the Express Server

From the root project directory, start the server:

```bash
npm start
```

**Expected output:**
```
Server is running on http://localhost:3000
```

**What this does:** Starts the Express server that serves the Angular application.

### Step 6: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the MEAN Stack Static Page with text content and images.

---

## 🔄 Running the Application (After Initial Setup)

Once you've completed the initial setup, you only need to:

1. **If you made changes to Angular code or added/changed images:**
   ```bash
   cd angular-app
   npm run build
   cd ..
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open browser:** Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
.
├── server.js                 # Express server configuration
├── package.json              # Backend dependencies
├── angular-app/              # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts      # Component logic
│   │   │   ├── app.component.html    # HTML template
│   │   │   ├── app.component.css     # Styles
│   │   │   └── app.module.ts         # Angular module
│   │   ├── assets/
│   │   │   └── img/                  # Image files go here
│   │   │       ├── image1.jpg
│   │   │       ├── image2.jpg
│   │   │       └── image3.jpg
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── dist/                 # Built files (generated after build)
│   │   └── angular-app/
│   ├── angular.json          # Angular configuration
│   ├── package.json          # Frontend dependencies
│   └── tsconfig.json         # TypeScript configuration
└── README.md
```

---

## 🖼️ Adding or Changing Images

### To Add Your Own Images:

1. **Place images in the assets folder:**
   - Location: `angular-app/src/assets/img/`
   - Supported formats: JPG, PNG, GIF, WebP, SVG
   - Recommended size: 400x300 pixels or larger

2. **Update the component file:**
   - Open: `angular-app/src/app/app.component.ts`
   - Find the `images` array (around line 13)
   - Update the `url` paths to match your image filenames:
     ```typescript
     images = [
       {
         url: 'assets/img/your-image1.jpg',
         alt: 'Description of image 1',
         title: 'Title for Image 1'
       },
       {
         url: 'assets/img/your-image2.jpg',
         alt: 'Description of image 2',
         title: 'Title for Image 2'
       },
       {
         url: 'assets/img/your-image3.jpg',
         alt: 'Description of image 3',
         title: 'Title for Image 3'
       }
     ];
     ```

3. **Rebuild the Angular app:**
   ```bash
   cd angular-app
   npm run build
   cd ..
   ```

4. **Restart the server:**
   - Stop the server (Ctrl+C in the terminal)
   - Start it again: `npm start`

---

## 🛠️ Troubleshooting

### Issue: "Cannot find module" errors

**Solution:** Make sure you've completed Step 2 and Step 3 (installing dependencies):
```bash
npm install
cd angular-app
npm install
cd ..
```

### Issue: Images not showing

**Solution:** 
1. Ensure images are in `angular-app/src/assets/img/`
2. Rebuild the Angular app:
   ```bash
   cd angular-app
   npm run build
   cd ..
   ```
3. Restart the server

### Issue: "Port 3000 already in use"

**Solution:** 
- Stop any other application using port 3000
- Or change the port in `server.js` (line 6):
  ```javascript
  const PORT = process.env.PORT || 3001;  // Change 3000 to 3001
  ```

### Issue: Build fails with errors

**Solution:**
1. Make sure you're using Node.js v14 or higher
2. Delete `node_modules` folders and reinstall:
   ```bash
   # From root directory
   rm -rf node_modules
   rm -rf angular-app/node_modules
   npm install
   cd angular-app
   npm install
   cd ..
   ```
   *On Windows, use `rmdir /s /q node_modules` instead of `rm -rf`*

### Issue: "ng: command not found"

**Solution:** This is normal. The Angular CLI is installed locally. Use `npm run build` instead of `ng build`.

---

## 📝 Available Scripts

### Root Directory Scripts:

- `npm install` - Install backend dependencies
- `npm start` - Start the Express server
- `npm run install-all` - Install both backend and frontend dependencies
- `npm run dev` - Start server with nodemon (auto-restart on changes)

### Angular App Scripts (from `angular-app` directory):

- `npm install` - Install frontend dependencies
- `npm run build` - Build Angular app for production
- `npm start` - Run Angular dev server (for development, runs on port 4200)

---

## 🌐 Accessing the Application

- **Production (Express server):** http://localhost:3000
- **Development (Angular dev server):** http://localhost:4200 (if running `npm start` from angular-app)

---

## ✏️ Modifying Content

### To Change Text Content:

1. **Edit the component TypeScript file:**
   - File: `angular-app/src/app/app.component.ts`
   - Change `title` and `description` properties

2. **Edit the HTML template:**
   - File: `angular-app/src/app/app.component.html`
   - Modify any text, headings, or structure

3. **Edit styles:**
   - File: `angular-app/src/app/app.component.css`
   - Modify colors, layout, spacing, etc.

4. **After making changes:**
   ```bash
   cd angular-app
   npm run build
   cd ..
   npm start
   ```

---

## 📦 Technologies Used

- **MongoDB**: Not used in this static example (MEAN stack structure maintained)
- **Express**: Web application framework for Node.js
- **Angular**: Frontend framework (v16)
- **Node.js**: JavaScript runtime environment

---

## ⚠️ Important Notes

1. **Always rebuild after changes:** If you modify Angular code or add/change images, you must run `npm run build` from the `angular-app` directory before the changes will appear.

2. **Server must be running:** The Express server must be running for the application to be accessible.

3. **No database required:** This is a static page application with no database interaction.

4. **Production build:** The application uses production builds. For development with hot-reload, you can run `npm start` from the `angular-app` directory (runs on port 4200).

---

## 📞 Support

If you encounter any issues not covered in this guide:

1. Verify all prerequisites are installed correctly
2. Ensure you've followed all steps in order
3. Check that all dependencies are installed
4. Verify the build completed successfully
5. Check the terminal/console for error messages

---

## 📄 License

ISC

---

**Last Updated:** December 2024
