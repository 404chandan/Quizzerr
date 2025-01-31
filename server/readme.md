# Quiz Web Application

This project is a simple quiz application with user authentication using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It incorporates full CRUD operations with some intriguing functionalities.

## Features

### Admin
- **Login Authentication**: Admin can log in to the dashboard. If entered credentials are invalid, it shows an error message; otherwise, it redirects to the dashboard.
- **Manage Quizzes**: Admin can add, edit, and delete quizzes and their questions. Each quiz contains a title, description (optional), and timer.
- **View Quizzes**: Admin can view all quizzes added to the application.
- **MCQ Questions**: All questions are Multiple Choice Questions (MCQs) for easy implementation.
- **View Scores**: Admin can view scores of all users who attempted a quiz or any particular quiz.
- **Dashboard**: Admin can view all necessary data on the dashboard.

### User
- **View Quizzes**: Users can view all available quizzes on the web application added by the admin.
- **Attempt Quizzes**: Users can answer all questions in quizzes they have not previously attempted. If a user has already attempted a quiz, an appropriate message is displayed.
- **View Scores**: After completing a quiz, users can view their score.
- **History**: Users can view all previously attempted quizzes and scores of particular quizzes.
- **Dashboard**: Users can view all necessary data on the dashboard.

## Additional Notes
- **Token-Based Authentication**: Implement JWT (JSON Web Token) authentication to secure access to protected resources (quizzes). Middleware function is a must.
- **Responsive Design**: Make all pages responsive."# Quizzy" 
