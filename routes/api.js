const router = require("express").Router();
const Workout = require("../models/Workout.js");

// api routes
// get most recent workout
router.get("/api/workouts", (req, res) => {
    Workout.find({}).sort({day: -1}).limit(1)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
// get all workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).sort({day: -1}).limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// update workout id with new exercise
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// Create new blank workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
      .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});  

module.exports = router;