import {
  Box, 
  Center, 
  Divider, 
  Text, 
  Stack, 
  HStack
} from "@chakra-ui/react"
import { Link as ReachLink } from "react-router-dom"

const Footer = () => {

return (<Box
    mt="auto"
    width="100%"
  >
      <Divider pb={4} mb={2}/>
      <Center width="100%" my="3">
        <HStack spacing={35}>
          <Stack spacing={0} pr={5}>
            <Text>kv#1048</Text>
          </Stack>

          <Stack borderLeft={"solid #323136 1px"} spacing={0} pl={5}>
            <Text as={ReachLink} to="/terms">Terminos y condiciones</Text>
            <Text as={ReachLink} to="/privacy">Aviso de privacidad</Text>
          </Stack>
        </HStack>

      </Center>
  </Box>)
}

/*
const Footer = () => {
  return (
    <></>
  )
}
*/

export default Footer