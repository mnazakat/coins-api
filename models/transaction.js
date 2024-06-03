const db = require("../config/db");

const createTranscation = (transaction, callback) => {
  const { userId, type, amount, status } = transaction;
  const sql = `INSERT INTO transcations (user_id, type, amount, status) VALUES(?,?,?,?)`;
  db.run(sql, [userId, type, amount, status], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

const updateTransactionStatus = (transactionId, status, callback) => {
  const sql = `UPDATE transcations SET status = ? WHERE id = ?`;
  db.run(sql, [status, transactionId], function (err) {
    if (err) {
      return callback(err);
    }
    callback({ changes: this.changes });
  });
};

const getTransactionsByStatus = (staus, callback) => {
  const sql = `SELECT * FROM transcations WHERE status = ? ORDER BY createdAT DESC`;
  db.all(sql, [staus], function (err, rows) {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const getTransactionsByUserId = (userId, callback) => {
  const sql = `SELECT * FROM transcations WHERE user_id = ? ORDER BY createdAt DESC`;
  db.all(sql, [userId], function (err, rows) {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

module.exports = {
  createTranscation,
  getTransactionsByUserId,
  updateTransactionStatus,
  getTransactionsByStatus
};
