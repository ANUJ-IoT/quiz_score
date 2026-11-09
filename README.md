# Quiz App

A simple quiz web application with minimal authentication, built with React, Node.js, Express and MySQL.

## Features

- User signup and login
- Choose the number of questions, category and difficulty
- Questions fetched live from Open Trivia DB
- Score page shown after each quiz
- Leaderboard of top scores

## The SQL Database Structure

- Refer to the schema.sql {~/quiz_score/backend/schema.sql} file to understand and initialise the sql database suitable for the quiz to run.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MySQL

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Setup

1. Clone the repo
   `git clone https://github.com/ANUJ-IoT/quiz_score.git`
2. Set up the database: create a MySQL database and run `[schema.sql]`
3. Backend:
   - `cd backend`
   - Copy `.env.example` to `.env` and fill in your values
   - `npm install`
   - `npm start`
4. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Credits

Quiz questions are provided by [Open Trivia DB](https://opentdb.com). Its flexible parameters make it easy to cover many more quiz topics.
