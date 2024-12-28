# Virtual Office
My try to get a bare-bones implementation of gather.com

## Features

- **Real-Time Collaboration**: Work with  team in a shared virtual space.
- **Interactive Environment**: Navigate a virtual office built with Phaser.

## Technology Stack
### Frontend
- **Angular**: Provides a dynamic, responsive user interface.

### Backend
- **.NET Core**: Powers the API and handles business logic.

### Database
- **PostgreSQL**: Stores user data, office configurations, and collaboration history.

### Game Engine
- **Phaser**: Creates the interactive virtual office environment.

## Database
![Untitled(1)](https://github.com/user-attachments/assets/c681543e-580d-4020-9a09-e8ddb3ec6e37)


## Installation and Setup

### Prerequisites
- **Node.js** and **npm** (for Angular frontend)
- **.NET Core SDK** (for backend API)
- **PostgreSQL** (for database)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/PranavJayachandran/virtual-office.git
   cd virtual-office
   ```

2. **Setup the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Setup the Backend**
   ```bash
   cd backend/virtualoffice
   dotnet restore
   dotnet run
   ```

4. **Setup the Database**
   - Install PostgreSQL and create a database.
   - Run the migration scripts provided in `backend/virtualoffice/migrations`.

5. **Run the Application**
   - Open your browser and navigate to `http://localhost:4200` for the frontend.


## Project Structure

### Frontend
- `frontend/src`: Angular application source code.

### Backend
- `backend/virtualoffice`: .NET Core API source code.

### Database
- `backend/virtualoffice/migrations`: SQL scripts for database schema.


---

