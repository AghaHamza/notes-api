# Notes API

A RESTful API for managing personal notes, built with Node.js, Express, and PostgreSQL. Features user authentication with JWT tokens and secure password hashing.

## Live URL

```
https://notes-api-production-c51e.up.railway.app
```

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — PostgreSQL (Neon)
- **Authentication** — JWT (jsonwebtoken)
- **Password Hashing** — bcrypt
- **Validation** — express-validator
- **Deployment** — Railway

## Project Structure

```
notes-api/
├── controllers/
│   ├── authController.js     # Register & login logic
│   └── notesController.js    # CRUD logic for notes
├── middlewares/
│   ├── AppError.js           # Custom error class
│   ├── authMiddleware.js     # JWT verification
│   ├── errorHandler.js       # Centralized error handler
│   └── validate.js           # Input validation checker
├── routes/
│   ├── auth.js               # /auth/* routes
│   └── notes.js              # /notes/* routes
├── app.js                    # Server setup
├── db.js                     # Database connection
└── .env                      # Environment variables (never commit)
```

## Getting Started Locally

### Prerequisites

- Node.js v18+
- PostgreSQL installed locally

### Installation

1. Clone the repository

```bash
git clone https://github.com/AghaHamza/notes-api.git
cd notes-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root folder

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Create the database tables

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. Start the development server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Create a new account | No |
| POST | `/auth/login` | Login and get token | No |

### Notes Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notes` | Get all your notes | Yes |
| POST | `/notes` | Create a new note | Yes |
| PUT | `/notes/:id` | Update a note | Yes |
| DELETE | `/notes/:id` | Delete a note | Yes |

---

## Usage Examples

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Hamza",
  "email": "hamza@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Hamza",
    "email": "hamza@example.com"
  }
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "hamza@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Create a Note

```http
POST /notes
Authorization: Bearer your_token_here
Content-Type: application/json

{
  "title": "My first note",
  "content": "This is the content of my note."
}
```

**Response:**
```json
{
  "id": 1,
  "title": "My first note",
  "content": "This is the content of my note.",
  "user_id": 1,
  "created_at": "2026-05-27T..."
}
```

### Get All Notes

```http
GET /notes
Authorization: Bearer your_token_here
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "My first note",
    "content": "This is the content of my note.",
    "user_id": 1,
    "created_at": "2026-05-27T..."
  }
]
```

---

## Authentication

This API uses JWT (JSON Web Token) authentication. After logging in, include the token in the `Authorization` header of every protected request:

```
Authorization: Bearer your_token_here
```

Tokens expire after **1 hour**. Login again to get a new token.

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad request / validation error |
| 401 | Unauthorized / invalid token |
| 404 | Resource not found |
| 500 | Server error |

---

## Author

**Hamza** — built as part of learning Node.js backend development.
