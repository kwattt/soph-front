import {
  Box,
  Select,
  SelectProps
} from "@chakra-ui/react"

import {useContext} from "react"
import { UserContext } from "../../../contexts/userContext"


const RoleSelector = (props: SelectProps) => {
  const {guild} = useContext(UserContext)

  return <Box overflowY="auto" maxH="160px" minw="50%">
    <Select {...props}>
        <option value="0">Ninguno</option>
        {guild.roles.map(role => {
          return <option key={role.id} value={role.id}>{role.name}</option>
        })}
    </Select>
  </Box>
}


export default RoleSelector