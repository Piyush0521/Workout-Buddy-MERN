import { useEffect } from "react";
import { Box, Heading, Flex, Spacer, Button, Link } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (user) {
      fetchWorkouts();
    }
    // {
    //   console.log(Array.isArray(workouts));
    //   console.log(Array.isArray(user));
    // }
  }, [dispatch, user]);

  const handleNavigate = () => {
    navigate("/addWorkout");
  };

  return (
    <div>
      {user && (
        <Flex
          pl={[6, 12]}
          pr={[5, 10]}
          pt={[3, 9]}
          pb={[3, 8]}
          fontFamily="rubik"
          alignItems="center"
        >
          <Box>
            {workouts.length > 0 && (
              <Heading fontFamily="rubik" fontSize={[20, 25]}>
                Workouts Todo..
              </Heading>
            )}
          </Box>
          <Spacer />
          <Box>
            <Button
              onClick={handleNavigate}
              px={[2, 3]}
              height={[7, 9]}
              textAlign="center"
              fontSize={[10, 20]}
              leftIcon={<AddIcon />}
              borderRadius="6px"
              background="#ECF1EE"
              boxShadow={["0px 5px #BABFBD", "0px 9px #BABFBD"]}
              // _hover={{ boxShadow: "1px 1px 1px 2px #C9CECB" }}
              _active={{
                background: "#D2DAD6",
                transform: "translateY(4px)",
                boxShadow: "0 2px #666",

                // fontSize: "18",
              }}
            >
              Add Workout
            </Button>
          </Box>
        </Flex>
      )}
      {workouts &&
        workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
          // </Flex>
        ))}
    </div>
  );
};

export default Home;
