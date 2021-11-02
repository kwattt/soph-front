import {
  Box,
  Spinner,
  Icon
} from "@chakra-ui/react"

import {
  MdError,
  MdCheckCircle
} from "react-icons/md"

const UpdateStatus = ({status}: {status : number}) => {

  return <Box 
    visibility={status === 0 ? "hidden" : "visible"}
    textAlign="center"
    alignContent="center"
    mt="5"
  >

    {status === 1 && 
      <Spinner color="green.500" size="md"/>
    }

    {status === 2 &&
      <Icon as={MdCheckCircle} color="green.500" size="30"/>
    }

    {status === 3 &&
      <Icon as={MdError} color="red.500" size="30"/>
    }

  </Box>
}

export default UpdateStatus