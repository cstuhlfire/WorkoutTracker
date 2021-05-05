const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
{
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type."
      },
      name: {
        type: String,
        trim: true,
        required: "Enter an exercise name."
      },
      duration: {
        type: Number,
        required: "Enter exercise duration in minutes."
      },
      distance: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      }
    }
  ]
},
{
  toJSON: {
    // include virtual field to client request
    virtuals: true
  }
});

// add dynamic virtual field to WorkoutSchema
WorkoutSchema.virtual("totalDuration").get(function() {
  // reduce array
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;