require("dotenv").config();
//requiring the package and invoking config method to it helps us to attach all those environment variables to the process object

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//just to supress the deprication warning
mongoose.set("strictQuery", true);

const app = express();

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to database & listening to port",
        process.env.PORT
      );
    });
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes setup
app.use("/api/workouts", workoutRoutes);
