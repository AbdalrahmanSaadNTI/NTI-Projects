NTI Summer Training Projects
A collection of projects built during the NTI Summer Training course, showcasing full-stack web development using Node.js, Express, MongoDB, and Angular.

🚀 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB

Frontend: Angular, TypeScript

Runtime: Node.js


🛠️ Prerequisites
Before running any project, ensure you have the following installed:

Node.js (v14 or higher)

MongoDB (local installation or MongoDB Atlas account)

Angular CLI (for Angular projects)

Git

⚡ Quick Start
Backend Setup (Node.js/Express)
Navigate to the project backend directory:

bash
cd project-name/backend
Install dependencies:

bash
npm install
Set up environment variables:

bash
cp .env.example .env
# Edit .env with your MongoDB connection string and other configurations
Start the development server:

bash
npm run dev
# or
npm start
Frontend Setup (Angular)
Navigate to the project frontend directory:

bash
cd project-name/frontend
Install dependencies:

bash
npm install
Start the Angular development server:

bash
ng serve
Open your browser and navigate to http://localhost:4200

📋 Available Projects
Project 1: Basic CRUD Operations
Simple Create, Read, Update, Delete operations

MongoDB integration

Basic Express server

Project 2: REST API Development
Complete RESTful API

Middleware implementation

Error handling

Data validation

Project 3: Full-Stack Application
Angular frontend

Express backend

MongoDB database

User authentication

Project 4: Advanced Features
File uploads

Pagination

Search functionality

API documentation

Final Project: Comprehensive Application
Complete full-stack solution

Advanced features

Production-ready code

🔧 Common Scripts
Backend Scripts
bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run build      # Build for production
Frontend Scripts
bash
ng serve          # Start development server
ng build          # Build for production
ng test           # Run unit tests
ng e2e            # Run end-to-end tests
📝 Environment Variables
Each project requires a .env file in the backend directory with the following variables:

env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret
NODE_ENV=development
🗃️ Database Setup
Local MongoDB
Install MongoDB locally

Start MongoDB service

Create database as per your configuration

MongoDB Atlas (Cloud)
Create account at MongoDB Atlas

Create a cluster and database

Get connection string

Update your .env file

🎯 Learning Objectives
Backend Development: Express.js, REST APIs, Middleware

Database: MongoDB, Mongoose ODM, Data Modeling

Frontend Development: Angular, Components, Services, Routing

Full-Stack Integration: API consumption, CORS, Error handling

Best Practices: Code structure, Security, Performance

🤝 Contributing
This repository contains course projects. For suggestions or improvements, please:

Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a Pull Request

📞 Support
For questions or support regarding these projects, please contact the course instructors or create an issue in the repository.

📜 License
This project is part of the NTI Summer Training Course. All rights reserved.

Happy Coding! 🎉
