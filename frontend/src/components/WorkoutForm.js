import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Center,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const BACKEND_URL = process.env.BACKEND_URL;

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Log in to input workouts");
      return;
    }

    const workout = { title, reps, load };

    const response = await fetch(`${BACKEND_URL}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new Workout added successfully", data);
      dispatch({ type: "ADD_WORKOUT", payload: data });

      navigate("/");
    }
  };

  return (
    <div className='background'>
      <Box mx={[8, "8rem"]} color='#383A39'>
        <form onSubmit={handleSubmit}>
          <FormControl
            isInvalid={emptyFields?.includes("title")}
            isRequired
            pt={[6, 12]}
          >
            <FormLabel fontWeight='bold' fontFamily='rubik'>
              Workout
            </FormLabel>
            <Input
              placeholder='Type the workout'
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {console.log(
              Array.isArray(emptyFields),
              emptyFields,
              emptyFields?.includes("title")
            )}
            {emptyFields?.includes("title") ? (
              <FormErrorMessage>**Required field</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={emptyFields?.includes("reps")}
            mt={[3, 6]}
          >
            <FormLabel
              fontWeight='bold'
              fontFamily='rubik
          '
            >
              Reps
            </FormLabel>
            <Input
              placeholder='Type the no. of reps'
              type='text'
              onChange={(e) => setReps(e.target.value)}
              value={reps}
            />
            {emptyFields?.includes("reps") ? (
              <FormErrorMessage>**Required field</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            isInvalid={emptyFields?.includes("load")}
            isRequired
            py={[3, 6]}
          >
            <FormLabel
              fontWeight='bold'
              fontFamily='rubik
          '
            >
              Load (in kg)
            </FormLabel>
            <Input
              placeholder='Type the load (in kgs)'
              type='text'
              onChange={(e) => setLoad(e.target.value)}
              value={load}
            />
            {emptyFields?.includes("load") ? (
              <FormErrorMessage>**Required field</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <Center>
            <Button
              onClick={handleSubmit}
              px={[3, 4]}
              height={[8, 9]}
              background='#ECF1EE'
              boxShadow={["0px 5px #BABFBD", "0px 9px #BABFBD"]}
              borderRadius='6px'
              // _hover={{ boxShadow: "1px 1px 1px 1px #C9CECB" }}
              _active={{
                background: "#D2DAD6",
                transform: "translateY(4px)",
                boxShadow: "0 3px #666",

                // fontSize: "18",
              }}
            >
              Submit
            </Button>
          </Center>
          {emptyFields?.length > 0 ? (
            <Center mt={[3, 5]} mb={[7, 10]}>
              <Box
                border='2px solid red'
                p={[1, 3]}
                borderRadius='5px'
                background='#F7BABA'
              >
                {error && (
                  <Text fontWeight='bold' fontFamily='rubik'>
                    {error}
                  </Text>
                )}
              </Box>
            </Center>
          ) : (
            ""
          )}
        </form>
      </Box>
    </div>
  );
};

export default WorkoutForm;
