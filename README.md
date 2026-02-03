# IndiaDataHub

## Live URL - https://india-data-hub-ten.vercel.app

- Demo Email - admin@indiadatahub.com,
- Demo Password - password123

## Features

- User Authentication (Login, Logout)
- Dashboard with Data Visualization
- Data Filtering and Sorting

## Technologies Used

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Deployment: Vercel (Frontend), Render (Backend)

## Installation Instructions

1. Clone the repository:
   ```bash
        git clone https://github.com/Himani1805/IndiaDataHub.git
        cd IndiaDataHub
   ```
2. Install dependencies for both frontend and backend:

   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd ../backend
   npm install
   ```

3. Set up environment variables: - Create a `.env` file in the `backend` directory with the following variables:
   ```bash
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    SALT=5
    JWT_SECRET_KEY=your_jwt_secret_key
    JWT_EXPIRES_IN=1d
    DATA_PATH=./src/data
    CLIENT_URL=http://localhost:5173
    ```
`4. Run the application
   `bash # Start backend server
cd backend
npm start

    # In a new terminal, start frontend server
    cd ../frontend
    npm start
    ```

5. Open your browser and navigate to `http://localhost:5000` to access the application.
