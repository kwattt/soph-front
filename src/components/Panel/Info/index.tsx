import { 
  Box,
  Heading
} from "@chakra-ui/react"

import { UserContext } from "../../../contexts/userContext"
import { useContext } from "react"

const Info = () => {
  const { guild } = useContext(UserContext)

  return <Box>
    <Heading>{guild.name}</Heading>

  </Box>
}

export default Info