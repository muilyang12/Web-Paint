# Web-Paint

## Overview

This project is a paint sharing application built using **WebSockets**, allowing multiple users to interact in real-time. The application is developed using **Next.js**, **Vite**, **Java**, **Spring Boot**, and **Docker**. And, this project is a simple web application designed to be deployed via the Jenkins pipeline created in the [Web-Paint-Jenkins](https://github.com/muilyang12/Web-Paint-Jenkins) repository. Through this pipeline, the application undergoes multiple processes such as **Checkout** and **Docker Build**, ensuring efficient CI/CD integration and deployment.

## Technologies Used

### Frontend

- TypeScript, React.js, Vite, WebSocket

### Backend

- Java, Spring Boot, Gradle, WebSocket

### DevOps ([Web-Paint-Jenkins](https://github.com/muilyang12/Web-Paint-Jenkins))

- Jenkins
- Docker

## Installation and Setup Instructions

Provide installation and setup instructions here.

1. Clone the repository.

   ```sh
   git clone https://github.com/muilyang12/Web-Paint.git
   ```

2. Build and run the backend service with Docker.

   ```sh
   docker build -t webpaint-be:latest ./webpaint-be
   docker run -d -p 8080:8080 --name webpaint-be webpaint-be:latest
   ```

3. Install the frontend dependencies and start the frontend development server.

   ```sh
   cd ./webpaint-fe
   npm install
   npm run dev
   ```
