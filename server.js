const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require('./routes/transactionRoutes')
const bodyParser = require("body-parser");
 require("./config/db");
const port = 3000;

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use('/transactions',transactionRoutes)

app.listen(port, (error) => {
  if (error) {
    console.log("The server did not Start", error);
    return;
  } else {
    console.log("The Server is running on http://localhost:" + port);
  }
});
