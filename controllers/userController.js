const db = require("../config/db");

const userController = {
  getAllUsers: (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ users: rows });
    });
  },
  


  createUser: (req, res) => {
    const { name, balance } = req.body;
    db.run(`INSERT INTO users(name, balance) VALUES('${name}',${balance})`, function (err) {
      if (err) {
        res.status(400).json({ message: "Error creating user" });
      } else {
        res.json({ message: "User created successfully", userId: this.lastID });
      }
    });
  },
};

module.exports = userController;
