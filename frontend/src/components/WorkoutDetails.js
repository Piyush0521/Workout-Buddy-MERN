import {
  Stack,
  Box,
  Text,
  Flex,
  Divider,
  Spacer,
  Button,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon, TimeIcon } from "@chakra-ui/icons";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
                background="#D2DAD6"
                _hover={{ boxShadow: "1px 1px 1px 1px #C9CECB" }}
                _active={{ background: "#666", color: "white" }}
              >
                Discard
              </Button>
            </Box>
          </Flex>
          <Divider borderColor="#E0E5EC" borderWidth="1px" />
          <HStack fontSize={[9, 13]}>
            <Text fontWeight="bold">Reps:</Text> <Text>{workout.reps}</Text>
          </HStack>

          <HStack fontSize={[9, 13]}>
            <Text fontWeight="bold">Load:</Text> <Text>{workout.load}</Text>
          </HStack>
          <Divider borderWidth={1} width={["80px", "100px"]} />
          <HStack>
            <TimeIcon />
            <Text fontSize={[9, 13]} fontWeight="bold">
              {formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </HStack>
        </Stack>
      </Box>
    </>
  );
};

export default WorkoutDetails;
