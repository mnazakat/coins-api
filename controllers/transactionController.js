const userModel = require('../models/user')
const transactionModel = require('../models/transaction')

const deposit = (req, res) => {
    const {userId, amount} = req.body;
    if(amount <=0) {
        return res.status(400).json({error:'Amount must be greater than zero'})
    }
    userModel.updateBalance(userId,amount, (err, result) => {
        if(err) {
            return res.status(400).json({error:err.message})
        }
        transactionModel.createTranscation({userId, type:'deposit', amount}, (err, transaction) => {
                 if(err) {
                    return res.status(500).json({error:err.message})
                 }
                 res.status(201).json(transaction)
        })
    
    })
}

const withdraw = (req, res) => {
  const {userId,amount}=req.body;
  if(amount <= 0) {
    return res.status(400).json({error:'Amount must be greater than zero'})
   }

userModel.getUserById(userId, (err, user) => {
    if(err) {
        return res.status(400).json({error:err.message})
    }
    if(user.balance < amount) {
        return res.status(400).json({error:'Insufficient funds'})
    }
    userModel.updateBalance(userId, -amount, (err,result) => {
        if(err) {
            return res.status(400).json({error:err.message});
        }
        transactionModel.createTranscation({userId, type:'withdraw', amount}, (err,transaction) =>{
            if(err) {
                return res.status(500).json({error:err.message})
            }
            res.status(201).json(transaction);
        });
     
    });

});
};

const transfer = (req,res) => {
    const {fromUserId, toUserId, amount} = req.body;
    if (amount <= 0) {
        return res.status(400).json({ error: 'Amount must be greater than zero' });
      }
      userModel.getUserById(fromUserId, (err, fromUser) =>{
          if(err) {
            return res.status(500).json({error:err.message})
          }
          if(fromUser.balance < amount) {
            return res.status(400).json({error:'Insufficient funds'});
          }
          userModel.updateBalance(fromUserId, -amount, (err, result) => {
            if(err) {
                return res.status(500).json({error:err.message});
            }
            userModel.updateBalance(toUserId, amount, (err, result) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }
            
            transactionModel.createTranscation({userId:fromUserId, type:'transfer',amount:-amount}, (err, transaction) => {
                if(err) {
                    return res.status(500).json({error:err.message});
                }
                transactionModel.createTranscation({userId:toUserId, type:'transfer',amount:amount}, (err, transaction) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                      }
                      res.status(201).json(transaction);
                });
            });
            });

          });

      });
}
getTransactions = (req, res) => {
    const userId = req.params.userId
    transactionModel.getTransactionsByUserId(userId, (err, transactions) => {
        if(err) {
            return res.status(500).json({error:err.message})
        }
        res.json(transactions)
    })
}



const updateTransactionStatus = (req, res) => {
  const {transactionId, status} =req.body;
   if(status !== 'active' && status !=='inactive'){
    return res.status(400).json({error:'Invalid status'})
   }
   transactionModel.updateTransactionStatus(transactionId, status, (err, result) =>{
    if(err) {
        return res.status(500).json({error:err.message})
    }
    res.status(200).json(result)
   })



}

const getTransactionsByStatus = (req, res) => {
    const status = req.params.status;
    transactionModel.getTransactionsByStatus(status,(err, transactions) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(transactions);
    });
  };

module.exports = {
    deposit,
    withdraw,
    transfer,
    getTransactions,
    updateTransactionStatus,
    getTransactionsByStatus
}