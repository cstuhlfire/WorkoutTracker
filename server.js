const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

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
    useUnifiedTopology: true, });

// api routes
// get most recent workout
app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).sort({day: -1}).limit(1)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// update workout id with new exercise
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// Create new blank workout
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
      .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});  

// html routes
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, './public/exercise.html')));
app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, './public/stats.html')));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});