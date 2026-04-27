# Hirely – Job Finder Web App

Hirely is a minimal and efficient job finder web application that enables users to browse job listings, post new opportunities, and access job data through a simple and intuitive interface.

---

## Features

* Browse all job listings
* Add new job postings
* View individual job details
* REST API for job data
* Fast and lightweight backend

---

## Tech Stack

* Backend: Node.js, Express
* Frontend: EJS Templates
* Database: SQLite (better-sqlite3)

---

## Project Structure

```
├── server.js        # Express server and routes
├── db.js            # Database setup and queries
├── views/           # EJS templates
├── public/          # Static files
├── package.json
```

---

## Getting Started

### Clone the repository

```
git clone https://github.com/your-username/hirely.git
cd hirely
```

### Install dependencies

```
npm install
```

### Run the application

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | /api/jobs     | Get all jobs  |
| GET    | /api/jobs/:id | Get job by ID |

---

## Future Improvements

* User authentication
* Search and filtering
* Job application functionality
* UI enhancements
* Deployment and scaling

---

## Author

Keerthi

