import {
  Box, 
  Center,
  Heading,
  Grid,
  Button,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react"

import {BsFillGearFill, BsCheck} from 'react-icons/bs'

import Logo from "../Other/Logo"
import useStats from "./stats"

const randomHeart = () => {
  let hearts = ["π","π","π","π","π","π","β£οΈ"]
  return hearts[Math.floor(Math.random()*hearts.length)]
}

const Homepage = () => {
  const stats = useStats()

  return <Box>
    <Center>
      <Logo/>
    </Center>
    <Center>
      <Heading>Soph {randomHeart()}</Heading>
    </Center>

    <Center mt="3">
      <Button
        borderRadius="3"
        onClick={() => {
          window.open("https://discord.com/oauth2/authorize?&client_id=657839781509857302&scope=bot%20applications.commands&permissions=8");
        }}
      >
        Invitar π
      </Button>
    </Center>

    <Grid
      mt="5"
      templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
      gridGap="30"
      textAlign="center"
    >
      <Box
        py="2"
        //bg="gray.900"
        border="solid 3px"
        borderColor="gray.700"
        borderRadius="5px 15px 20px 120px / 10px 205px 15px 10px"
      >
        <Heading size="md">Algunas funciones π§</Heading>
        <List marginTop="10px" spacing={2}>
          <ListItem>
            <ListIcon as={BsFillGearFill} color="purple.500" />
            Configurable por web
          </ListItem>
          <ListItem>
            <ListIcon as={BsCheck} color="purple.500" />
            Mensajes de informaciΓ³n
          </ListItem>
          <ListItem>
            <ListIcon as={BsCheck} color="purple.500" />
            Informe de redes sociales
          </ListItem>
          <ListItem>
            <ListIcon as={BsCheck} color="purple.500" />
            Entretenimiento
          </ListItem>
        </List>      
      </Box>      
      <Box
        //bg="gray.900"
        border="solid 3px"
        borderColor="gray.700"
        borderRadius="15px 5px 120px 20px / 205px 10px 10px 15px"
        py="2"
      >
        <Heading size="md">Stats! π</Heading>
        <List mt="10px" spacing="2">
          <ListItem>Servidores activos <b>{stats.guilds}</b>!</ListItem>
          <ListItem>Miembros activos <b>{stats.users}</b>!</ListItem>
        </List>
      </Box>      
    </Grid>

    <Center
      my="5"
      mx={["2%", "6%", "20%", "30%"]}
      textAlign="center"
    >
      {stats.message}
    </Center>

  </Box>
}

export default Homepage