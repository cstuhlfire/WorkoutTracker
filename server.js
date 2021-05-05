const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false });

// api routes
app.use(require("./routes/api.js"));
// html routes
app.use(require("./routes/html.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});