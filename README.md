# 🌟 Pranathi's Portfolio

A personal portfolio website with a built-in contact form backed by a SQLite database. Built with vanilla HTML, CSS, and JavaScript on the frontend, and Node.js + Express on the backend.

---

## 📁 Project Structure

```
pranathi-portfolio/
├── public/
│   ├── index.html      # Main portfolio page
│   ├── style.css       # Styling
│   ├── script.js       # Frontend logic
│   └── resume.pdf      # Downloadable resume
├── server.js           # Express server & API routes
├── contacts.db         # SQLite database (auto-created)
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pranathiii2007-ops/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
npm start
```

The server will start at **http://localhost:5000**

---

## ✨ Features

- **Responsive Design** — Works seamlessly across desktop and mobile devices
- **Contact Form** — Visitors can send messages directly from the site
- **SQLite Database** — All contact form submissions are persisted in a local `contacts.db` file
- **Resume Download** — Visitors can view/download the resume in PDF format
- **Admin Endpoint** — View all received messages via `GET /messages`

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript     |
| Backend    | Node.js, Express.js                 |
| Database   | SQLite (`better-sqlite3`)           |
| Middleware | CORS, body-parser                   |

---

## 🔌 API Endpoints

| Method | Endpoint   | Description                         |
|--------|------------|-------------------------------------|
| `GET`  | `/`        | Serves the portfolio homepage       |
| `POST` | `/contact` | Submits a contact form message      |
| `GET`  | `/messages`| Returns all stored messages (admin) |

### Contact Form Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd love to connect!"
}
```

---

## 📦 Dependencies

```json
{
  "express": "^5.2.1",
  "better-sqlite3": "^12.8.0",
  "body-parser": "^2.2.2",
  "cors": "^2.8.6"
}
```

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).

---

> Built with 💙 by Pranathi
