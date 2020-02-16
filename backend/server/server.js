//DB connection
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://swooshadmin:swoosh559@cluster0-ilppo.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }).catch(err => console.error(err));
mongoose.set('useFindAndModify', false);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//modules
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

if (!process.env.NODE_ENV) {
  app.use(logger("dev"));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

//routes
const userRoutes = require('./routes/users');
const donationRoutes = require('./routes/donations');
app.use('/donations', donationRoutes);
app.use('/users', userRoutes);

// app.use("/dist", express.static("dist"));
// app.use("/assets", express.static("assets"));

app.use((req, res, next) => {
  let err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log('here');
  res.status(err.status || 500);
  res.send({ error: err.status, message: err.message });
});

app.listen(port, () => {
  console.log(`Worker ${process.pid} listening at port ${port}`);
});


module.exports = app;
