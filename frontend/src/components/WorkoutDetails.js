import {
  Stack,
  Box,
  Text,
  Flex,
  Divider,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };

  return (
    <>
      <Box m={3}>
        <Stack
          px={[3, 6]}
          py={[1, 2]}
          my={[2, 5]}
          mx={[3, 12]}
          _hover={{ boxShadow: "1px 1px 2px 3px #C9CECB" }}
          borderRadius="5"
          fontFamily="rubik"
        >
          <Flex>
            <Box>
              <Text fontSize={[15, 20]} fontWeight="bold">
                {workout.title}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Button
                onClick={handleDelete}
                fontSize={[8, 15]}
                leftIcon={<DeleteIcon />}
                background="white"
                _hover={{ boxShadow: "1px 1px 1px 1px #C9CECB" }}
                _active={{ background: "#C9CECB" }}
              >
                Discard
              </Button>
            </Box>
          </Flex>
          <Divider border="1" />
          <Text fontSize={[9, 13]}>Reps: {workout.reps}</Text>

          <Text fontSize={[9, 13]}>Load: {workout.load}</Text>
        </Stack>
      </Box>
    </>
  );
};

export default WorkoutDetails;
