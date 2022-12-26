import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {
  Box,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
// import { DragHandleIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Center>
      <Box
        py={[4, 6]}
        px={[4, 7]}
        mt={[12, 16]}
        boxShadow="0px 0px 2px 2px #CAD4CF"
        borderRadius="7px"
      >
        <Center>
          <Text pb={[2, 4]} fontWeight="bold">
            Login
          </Text>
        </Center>
        <FormControl isRequired isInvalid={error}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter a valid Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl isRequired py={[3, 6]} isInvalid={error}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter a strong password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>
        <Center mt={[3, 4]} flexDirection="column">
          <Button
            mb={[3, 5]}
            type="submit"
            height={[7, 9]}
            disabled={isLoading}
            onClick={handleSubmit}
            background="#ECF1EE"
            boxShadow={["0px 5px #BABFBD", "0px 9px #BABFBD"]}
            borderRadius="6px"
            _active={{
              background: "#D2DAD6",
              transform: "translateY(4px)",
              boxShadow: "0 3px #666",
            }}
          >
            Submit
          </Button>
          {error && (
            <Box>
              <Text>{error}</Text>
            </Box>
          )}
        </Center>
      </Box>
    </Center>
  );
};

export default Login;
