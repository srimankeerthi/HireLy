const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'data.sqlite');
const exists = fs.existsSync(DB_PATH);
const db = new Database(DB_PATH);

if (!exists) {
  db.exec(`
    CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const insert = db.prepare('INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)');
  insert.run('Frontend Developer', 'Acme Corp', 'Remote', 'We are looking for a React developer...');
  insert.run('Backend Engineer', 'Beta LLC', 'New York, NY', 'Node.js/Express experience required');
  insert.run('Data Scientist', 'Gamma Inc', 'San Francisco, CA', 'ML and Python experience');
}

module.exports = {
  getAllJobs() {
    return db.prepare('SELECT id, title, company, location, description, created_at FROM jobs ORDER BY created_at DESC').all();
  },
  getJobById(id) {
    return db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
  },
  createJob({ title, company, location, description }) {
    const stmt = db.prepare('INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)');
    const info = stmt.run(title, company, location || null, description || null);
    return info.lastInsertRowid;
  }
};
