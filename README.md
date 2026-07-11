# AI Code Reviewer

## Project Overview

AI Code Reviewer is a web-based application developed as an academic project to assist developers and students in reviewing source code using Artificial Intelligence. The application utilizes the Google Gemini API to analyze code and provide suggestions for improving code quality, readability, maintainability, and performance.

The system consists of a React.js frontend and a Node.js/Express.js backend that communicates with the Gemini API to generate intelligent code reviews.

---

## Objectives

The primary objectives of this project are:

- To understand the integration of Large Language Models (LLMs) into web applications.
- To automate the process of reviewing source code.
- To provide developers with meaningful feedback on coding practices.
- To improve programming skills through AI-generated suggestions.

---

## Features

- Source code input through an interactive code editor.
- AI-generated code review using Google Gemini API.
- Syntax highlighting for code.
- Markdown rendering for formatted review output.
- REST API-based communication between frontend and backend.
- Error handling for invalid requests and API responses.

---

## Technologies Used

### Frontend

- React.js
- Vite
- Axios

### Backend

- Node.js
- Express.js
- CORS
- Dotenv

### AI Service

- Google Gemini API

---

## Project Structure

```
AI_Code_Reviewer
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── BackEnd
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/AI-Code-Reviewer.git
```

---

### Step 2: Install Frontend Dependencies

```bash
cd FrontEnd
npm install
```

---

### Step 3: Install Backend Dependencies

```bash
cd ../BackEnd
npm install
```

---

## Environment Configuration

Create a `.env` file inside the **BackEnd** directory and add your Google Gemini API key.

```env
GOOGLE_GEMINI_KEY=YOUR_API_KEY
```

Generate an API key from Google AI Studio:

https://aistudio.google.com/

---

## Running the Application

### Start the Backend

```bash
node server.js
```

The backend server runs on:

```
http://localhost:3000
```

---

### Start the Frontend

```bash
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

---

## API Endpoint

### Review Source Code

**POST**

```
/ai/get-review
```

### Request

```json
{
    "code": "function add(a, b) { return a + b; }"
}
```

### Response

The API returns an AI-generated review of the submitted source code in Markdown format.

---

## System Workflow

1. The user enters source code into the editor.
2. The frontend sends the code to the backend using Axios.
3. The Express server receives the request.
4. The backend forwards the code to the Google Gemini API.
5. Gemini analyzes the code and generates a review.
6. The review is returned to the frontend.
7. The review is displayed in a formatted Markdown view.

---

## Learning Outcomes

This project demonstrates the practical implementation of:

- RESTful API development
- Client-server architecture
- React.js frontend development
- Express.js backend development
- Environment variable management
- Third-party API integration
- AI-assisted software development
- Asynchronous programming using JavaScript

---

## Limitations

- The application currently supports text-based code review only.
- An active internet connection is required to access the Gemini API.
- A valid Google Gemini API key is required.
- API usage is subject to Google's rate limits and quota policies.

---

## Future Enhancements

- User authentication
- File upload support.
- AI-powered code refactoring.
- Downloadable review reports.
- Dark mode support.
- Unit test generation.
- Code quality scoring.

---

## Author

**Mehwish Afsar**

Bachelor of Software Engineering

Jinnah University for Women
