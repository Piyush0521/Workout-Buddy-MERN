const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

//create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length !== 0) {
    return res
      .status(400)
      .json({ error: "Please fill the required fields", emptyFields });
  }

  //add to database
  try {
    const newWorkout = await Workout.create({ title, reps, load });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all workouts
const getAllWorkouts = async (req, res) => {
  const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(allWorkouts);
};

//get a specific workout
const getSpecificWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exist" });
  }
  const getWorkout = await Workout.findById(id);
  if (!getWorkout) {
    return res.status(404).json({ error: "No Workout exixts" });
  }
  res.status(200).json(getWorkout);
};

//Delete a workout
const deleteSpecificWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exist" });
  }
  const deleteWorkout = await Workout.findOneAndDelete({ _id: id });
  if (!deleteWorkout) {
    return res.status(404).json({ error: "No Workout exixts" });
  }
  res.status(200).json(deleteWorkout);
};

//Update a workout
const updateSpecificWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exist" });
  }

  const updateWorkout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!updateWorkout) {
    return res.status(404).json({ error: "No Workout exixts" });
  }
  res.status(200).json(updateWorkout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSpecificWorkout,
  deleteSpecificWorkout,
  updateSpecificWorkout,
};
