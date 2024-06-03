const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("coins.db", (err) => {
  if (err) {
    console.error("Error opening database: " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    balance INTEGER NOT NULL
   )`,
);

db.run(
  `CREATE TABLE IF NOT EXISTS transcations(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT DEFAULT 'active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`
    
);

module.exports = db;
