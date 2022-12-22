import { useState, useEffect } from "react";
import { Box, Heading, Flex, Spacer, Button, Link } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

//components
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
  const [workouts, setworkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        setworkouts(data);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <Flex
        pl={[6, 12]}
        pr={[5, 10]}
        pt={[3, 9]}
        pb={[3, 8]}
        fontFamily="rubik"
        alignItems="center"
      >
        <Box>
          <Heading fontFamily="rubik" fontSize={[20, 30]}>
            Workouts Todo..
          </Heading>
        </Box>
        <Spacer />
        <Link href="/addWorkout" _>
          <Box>
            <Button
              textAlign="center"
              fontSize={[10, 20]}
              leftIcon={<AddIcon />}
              borderRadius="6px"
              background="#E0E5EC"
              boxShadow="0px 9px #999"
              // _hover={{ boxShadow: "1px 1px 1px 2px #C9CECB" }}
              _active={{
                background: "#C6D4CD",
                transform: "translateY(4px)",
                boxShadow: "0 5px #666",

                // fontSize: "18",
              }}
            >
              Add Workout
            </Button>
          </Box>
        </Link>
      </Flex>
      {workouts &&
        workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
          // </Flex>
        ))}
    </div>
  );
};

export default Home;
