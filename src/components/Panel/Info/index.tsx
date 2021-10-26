import { 
  Box,
  Avatar,
  Heading,
  Center,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react"

import { UserContext } from "../../../contexts/userContext"
import { useContext } from "react"

import { BsPersonLinesFill, BsFillChatFill, BsFillPencilFill } from "react-icons/bs"

const Info = () => {
  const { guild } = useContext(UserContext)

  return  <Box>
    <Center>
      <Box textAlign="center">
        <Avatar src={guild.icon} size="lg"/>
        <Heading as="h2" size="xl">{guild.name}</Heading>

        <List mt="5">
          <ListItem>
            <ListIcon as={BsPersonLinesFill} mr={2}/>
            <span><b>{guild.members}</b> miembros</span>
          </ListItem>
          <ListItem>
            <ListIcon as={BsFillPencilFill} mr={2}/>
            <span><b>{guild.roles.length}</b> roles</span>
          </ListItem>
          <ListItem>
            <ListIcon as={BsFillChatFill} mr={2}/>
            <span><b>{guild.channels.length}</b> canales</span>
          </ListItem>
        </List>

        {/* 
        <Box mt="5">
          <Heading as="h3" size="md">Logs</Heading>
          ~~~
        </Box>        
        */}

      </Box>
    </Center>
  </Box>
}

export default Info