require("dotenv").config();
const express = require("express");
const connectDb = require("./config/mongoose");
const app = express();
const port = process.env.PORT;
connectDb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/customers", require("./routes/customerRoute"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
