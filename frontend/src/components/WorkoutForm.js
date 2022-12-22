import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, reps, load };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new Workout added successfully", data);
      // navigate("/");
    }
  };

  return (
    <div className="background">
      <Box mx={[8, "8rem"]} color="#383A39">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired pt={[6, 12]}>
            <FormLabel fontWeight="bold" fontFamily="rubik">
              Workout
            </FormLabel>
            <Input
              placeholder="Type the workout"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </FormControl>
          <FormControl isRequired mt={[3, 6]}>
            <FormLabel
              fontWeight="bold"
              fontFamily="rubik
          "
            >
              Reps
            </FormLabel>
            <Input
              placeholder="Type the no. of reps"
              type="text"
              onChange={(e) => setReps(e.target.value)}
              value={reps}
            />
          </FormControl>
          <FormControl isRequired py={[3, 6]}>
            <FormLabel
              fontWeight="bold"
              fontFamily="rubik
          "
            >
              Load (in kg)
            </FormLabel>
            <Input
              placeholder="Type the load (in kgs)"
              type="text"
              onChange={(e) => setLoad(e.target.value)}
              value={load}
            />
          </FormControl>
          <Center>
            <Button
              onClick={handleSubmit}
              background="#E0E5EC"
              boxShadow="0 9px #999"
              borderRadius="6px"
              // _hover={{ boxShadow: "1px 1px 1px 1px #C9CECB" }}
              _active={{
                background: "#C6D4CD",
                transform: "translateY(4px)",
                boxShadow: "0 5px #666",

                // fontSize: "18",
              }}
            >
              Submit
            </Button>
          </Center>
        </form>
      </Box>
    </div>
  );
};

export default WorkoutForm;
