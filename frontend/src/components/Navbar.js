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
} from "@chakra-ui/react";
import {
  //   AddIcon,
  //   ChevronDownIcon,
  ChevronRightIcon,
  //   HamburgerIcon,
  //   PhoneIcon,
} from "@chakra-ui/icons";

const Navbar = () => {
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
          <BreadcrumbItem>
            <BreadcrumbLink href="/" fontSize={[10, 20]}>
              Workouts Todo
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/about" fontSize={[10, 20]}>
              About
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
