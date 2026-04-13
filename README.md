# Student Event Registration and Management System

A full-stack application for student event registration and management with React TypeScript frontend and Spring Boot microservices backend.

## Architecture

### Frontend (Port 3000)
- **React 18** with TypeScript
- **Custom CSS** (replacing TailwindCSS for compatibility)
- **React Router** for navigation
- **Fetch API** for REST communication

### Backend Microservices
- **Student Service** (Port 8081) - Student registration and login
- **Event Service** (Port 8082) - Event management and retrieval

### Database
- **MongoDB** for data persistence

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Java 17** or higher
3. **Maven** 3.6 or higher
4. **MongoDB** running on localhost:27017

## Installation Instructions

### 1. Install Node.js
Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)

### 2. Install Java 17
Download and install Java 17+ from [https://adoptium.net/](https://adoptium.net/)

### 3. Install Maven
- **Windows**: Download from [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi) and follow installation instructions
- **macOS**: `brew install maven`
- **Linux (Ubuntu/Debian)**: `sudo apt-get install maven`

### 4. Install MongoDB
- **Windows**: Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Linux (Ubuntu/Debian)**: `sudo apt-get install mongodb`

## Setup Instructions

### 1. Database Setup

Install and start MongoDB on your system:
```bash
# For Windows (using MongoDB Compass or command line)
mongod

# For macOS (using Homebrew)
brew services start mongodb-community

# For Linux (Ubuntu/Debian)
sudo systemctl start mongod
```

### 2. Backend Setup

#### Student Service
```bash
cd student-service
mvn clean install
mvn spring-boot:run
```
The service will start on port 8081.

#### Event Service
```bash
cd event-service
mvn clean install
mvn spring-boot:run
```
The service will start on port 8082.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```
The application will start on port 3000.

## Project Structure

```
IP-MODEL-ASS/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Register.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Events.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── App.tsx
│   └── package.json
├── student-service/         # Spring Boot Student Microservice
│   ├── src/main/java/com/student/studentservice/
│   │   ├── controller/StudentController.java
│   │   ├── service/StudentService.java
│   │   ├── repository/StudentRepository.java
│   │   ├── model/Student.java
│   │   └── StudentServiceApplication.java
│   ├── pom.xml
│   └── application.properties
└── event-service/          # Spring Boot Event Microservice
    ├── src/main/java/com/student/eventservice/
    │   ├── controller/EventController.java
    │   ├── service/EventService.java
    │   ├── repository/EventRepository.java
    │   ├── model/Event.java
    │   └── EventServiceApplication.java
    ├── pom.xml
    └── application.properties
```

## API Endpoints

### Student Service (Port 8081)

#### Register Student
```
POST /api/students/register
Content-Type: application/json

{
  "rollNumber": "CS101",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Student Login
```
POST /api/students/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Event Service (Port 8082)

#### Get Events by Roll Number
```
GET /api/events/{rollNumber}
```

## Sample Data

The Event Service automatically populates sample data on startup:

- **CS101**: Tech Symposium 2024, Hackathon Weekend
- **CS102**: Workshop: Web Development
- **CS103**: Guest Lecture: Cybersecurity, Coding Competition

## Application Flow

1. **Registration**: Students register with roll number, name, email, and password
2. **Login**: Students login with email and password
3. **Events View**: After successful login, students can view their registered events

## Testing the Application

### Test Users
You can register new students or use these sample roll numbers to test events:
- CS101 (2 events)
- CS102 (1 event)
- CS103 (2 events)

### Test Flow
1. Navigate to `http://localhost:3000`
2. Register a new student or go to `/login`
3. Login with registered credentials
4. View events on the events page

## Features

- ✅ Student registration with validation
- ✅ Student login with authentication
- ✅ Event display with responsive cards
- ✅ CORS enabled for cross-origin requests
- ✅ MongoDB integration
- ✅ Sample data for testing
- ✅ Error handling and validation
- ✅ Clean UI with custom CSS
- ✅ TypeScript interfaces for type safety

## Development Notes

- Frontend uses React Router for navigation
- Backend uses Spring Boot with layered architecture
- MongoDB collections: `students`, `events`
- Sample data is automatically inserted on Event Service startup
- All services are configured for CORS with `http://localhost:3000`
- Custom CSS is used instead of TailwindCSS for better compatibility

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on localhost:27017
   - Check database names in application.properties

2. **Port Conflicts**
   - Student Service: 8081
   - Event Service: 8082
   - Frontend: 3000
   - Change ports if conflicts occur

3. **CORS Issues**
   - Verify frontend URL in @CrossOrigin annotations
   - Check if frontend is running on correct port

4. **Build Failures**
   - Ensure Java 17+ is installed
   - Check Maven dependencies in pom.xml files
   - Verify Maven is in your system PATH

5. **Maven Not Found**
   - Add Maven bin directory to system PATH
   - Verify installation with `mvn -version`

## Quick Start Guide

1. **Install all prerequisites** (Node.js, Java 17, Maven, MongoDB)
2. **Start MongoDB**: `mongod`
3. **Start Student Service**: `cd student-service && mvn spring-boot:run`
4. **Start Event Service**: `cd event-service && mvn spring-boot:run`
5. **Start Frontend**: `cd frontend && npm start`
6. **Open Browser**: Navigate to `http://localhost:3000`

## Verification Commands

```bash
# Check Node.js version
node --version

# Check Java version
java --version

# Check Maven version
mvn --version

# Check MongoDB connection
mongo --eval "db.adminCommand('ismaster')"

# Test Student Service
curl http://localhost:8081/api/students

# Test Event Service
curl http://localhost:8082/api/events/CS101
```
