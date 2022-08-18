require("dotenv").config();
require("express-async-errors");
PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//routes
app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

const productRouter = require("./routes/productRoutes");
app.use("/api/v1/products", productRouter);

//middleware
const notFound = require("./middleware/not-found");
app.use(notFound);
const errorHandler = require("./middleware/errorHandle");
app.use(errorHandler);

//connect DB
const connectDB = require("./db/connect");

//Start Server
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

start();
