# Event Messenger App

## Overview
Event Messenger is a scalable and well-abstracted NestJS-based application that automatically sends event-based messages to users, such as birthday greetings. The system is designed with future extensibility in mind, allowing additional event types (e.g., anniversaries) to be seamlessly integrated.

The application ensures reliability by recovering and sending any unsent messages if the service experiences downtime. For testing purposes, SQLite is used as the database.

## Short Brief
- **Automated Birthday Greetings**: Sends birthday messages to users automatically.
- **Scalability & Abstraction**: Designed with a modular architecture to support additional event types in the future.
- **Failure Recovery**: Recovers and sends unsent messages after a service interruption.
- **NestJS Framework**: Leverages the benefits of NestJS for a well-structured and maintainable codebase.
- **SQLite for Testing**: Uses SQLite for lightweight database operations during testing.

## This app using NestJS
NestJS is chosen for its structured and scalable architecture. The key advantages include:
- **Modularity**: Promotes separation of concerns through modules, making the system easier to extend.
- **Dependency Injection**: Enhances testability and maintainability.
- **Built-in Middleware Support**: Facilitates request processing and logging.
- **Powerful CLI**: Simplifies project setup and management.
- **Typescript Support**: Ensures type safety and better developer experience.

## Installation
### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn
- SQLite (for testing)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/manggiperdana/event-messager-app
   cd event-messager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application with dev log:
   ```sh
   npm run start:dev
   ```
4. Once the app running it's will generate sqlite file:
   ```sh
   event-messager-app.db
   ```
## API Endpoint Usage
1. Create User:
   ```sh
   Method : POST
   Endpoint : http://localhost:3000/user
   Body Structure: {
      "firstName":"YourFirstName",
      "lastName":"YourLastName",
      "email":"youremail@email.com",
      "birthday":"1989-01-31",
      "location":"Asia/Jakarta"
    }
   ```
2. Update User:
   ```sh
   Method : PUT
   Endpoint : http://localhost:3000/user/userId
   Body Structure: {
      "firstName":"YourFirstName",
      "lastName":"YourLastName",
      "email":"youremail@email.com",
      "birthday":"1989-01-31",
      "location":"Asia/Jakarta"
    }
   ```

## Features
- Users are registered in the database with their birthdate.
- The service checks daily for users' birthdays and sends messages accordingly.
- If the service was down, it will send any missed messages upon recovery.

## Extensibility
- New event types can be added by creating additional event modules.
- The event processing logic is abstracted, making it easy to integrate custom messaging strategies.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for discussion.

## License
This project is licensed under the MIT License.

