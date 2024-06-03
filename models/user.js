const db = require("../config/db");

const getUserById = (id, callback) => {
  const sql =`SELECT * FROM users WHERE id = ?`;
  db.get(sql,[id], function(err, row) {
    if(err){
      return callback(err)
    }
    callback(null,row)
  });
;}

const updateBalance = (id, amount, callback) => {
       const sql = `UPDATE users SET balance = balance + ? WHERE id = ?`;
       db.run(sql, [amount, id], function(err) {
        if(err) {
          return callback(err);
        }
        callback(null, {changes:this.changes})
       })
}
module.exports = {
  getUserById,
  updateBalance
}

