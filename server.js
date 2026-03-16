const express    = require("express");
const path       = require("path");
const cors       = require("cors");
const bodyParser = require("body-parser");
const Database   = require("better-sqlite3");

const app  = express();
const PORT = 5000;

// ── SQLite Database Setup ───────────────────────────────────────────────────
const db = new Database(path.join(__dirname, "contacts.db"));

// Create table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT    NOT NULL,
        email     TEXT    NOT NULL,
        message   TEXT    NOT NULL,
        createdAt TEXT    DEFAULT (datetime('now'))
    )
`);

console.log("✅ SQLite database ready (contacts.db)");

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ── Home route ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Contact form API ────────────────────────────────────────────────────────
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {
        const stmt = db.prepare(
            "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
        );
        const info = stmt.run(name.trim(), email.trim(), message.trim());

        console.log(`📩 Message saved — ID: ${info.lastInsertRowid} | From: ${name} <${email}>`);

        res.json({
            success: true,
            message: "✅ Message sent successfully! I'll get back to you soon."
        });
    } catch (err) {
        console.error("DB error:", err.message);
        res.status(500).json({
            success: false,
            message: "❌ Server error. Please try again later."
        });
    }
});

// ── View all messages (admin) ───────────────────────────────────────────────
app.get("/messages", (req, res) => {
    try {
        const rows = db.prepare("SELECT * FROM contacts ORDER BY id DESC").all();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});