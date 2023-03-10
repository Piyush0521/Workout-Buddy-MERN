const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSpecificWorkout,
  deleteSpecificWorkout,
  updateSpecificWorkout,
} = require("../controllers/workoutCont");
const router = express.Router();
const authRequire = require("../middleware/authRequire");

//verifying authentication of user logging in for all workout routes
router.use(authRequire);

//SETTING UP ROUTES
//GET all Workouts
router.get("/", getAllWorkouts);

//Add a workout
router.post("/", createWorkout);

//Get a specific workout
router.get("/:id", getSpecificWorkout);

//Delete a workout
router.delete("/:id", deleteSpecificWorkout);

//Update a workout
router.patch("/:id", updateSpecificWorkout);

module.exports = router;
