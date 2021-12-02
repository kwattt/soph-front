import {
  Box,
  Stack,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps
} from "@chakra-ui/react"

import {useContext} from "react"
import { UserContext } from "../../../contexts/userContext"

const RoleSelectorMultiple = (props: CheckboxGroupProps) => {
  const {guild} = useContext(UserContext)

  return <Box overflowY="auto" maxH="160px" minw="50%">
    <CheckboxGroup {...props}>
      <Stack spacing={1}>
        {guild.roles.map(role => {
          return <Checkbox key={role.id} value={role.id}>{role.name}</Checkbox>
        })}
      </Stack>
    </CheckboxGroup>
  </Box>
}


export default RoleSelectorMultiple