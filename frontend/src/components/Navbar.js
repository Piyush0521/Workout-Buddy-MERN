import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Flex,
  Heading,
  Spacer,
  Divider,
  Box,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box>
      <Flex justifyContent="center" mx={[3, 5]} mt={[10, 20]} px={[1, 3]}>
        <Box>
          <Flex alignItems="center">
            <Image src="\workout_1.png" h={[12, 20]} w={[12, 20]}></Image>
            <Heading fontSize={[18, 42]} fontFamily="Pacifico" color="#383A39">
              Workout Buddy
            </Heading>
          </Flex>
        </Box>
        <Spacer />
        <Breadcrumb
          fontWeight="bold"
          fontFamily="rubik"
          color="#606764"
          alignSelf="flex-end"
          spacing={[0, 1]}
          separator={<ChevronRightIcon color="#B7BBB9" />}
        >
          {!user && (
            <BreadcrumbItem>
              <Button
                onClick={() => navigate("/signup")}
                colorScheme="#606764"
                variant="outline"
                fontSize={[10, 20]}
                size={["xs", "sm"]}
              >
                Signup
              </Button>
            </BreadcrumbItem>
          )}
          {!user && (
            <BreadcrumbItem>
              <Button
                onClick={() => navigate("/login")}
                colorScheme="#606764"
                variant="outline"
                fontSize={[10, 20]}
                size={["xs", "sm"]}
              >
                Login
              </Button>
            </BreadcrumbItem>
          )}
          {user && (
            <BreadcrumbItem fontSize={[10, 20]}>
              <Text>{user.email}</Text>
            </BreadcrumbItem>
          )}
          {user && (
            <BreadcrumbItem>
              <Button
                onClick={handleLogout}
                colorScheme="#606764"
                variant="outline"
                fontSize={[10, 20]}
                size={["xs", "sm"]}
              >
                Logout
              </Button>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem>
            <BreadcrumbLink href="/about" fontSize={[10, 20]}>
              About Us {console.log(user)}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* <BreadcrumbItem>
            <BreadcrumbLink href="/newBlog" fontSize={[10, 20]}>
              {" "}
              New Blog
            </BreadcrumbLink>
          </BreadcrumbItem> */}
        </Breadcrumb>
      </Flex>
      <Box mx={[5, 10]} mt={[4, 14]}>
        <Divider borderColor={"gray"} borderWidth="1px" />
      </Box>
    </Box>
  );
};

export default Navbar;
