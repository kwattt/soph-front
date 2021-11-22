import {
  Box,
  Select,
  SelectProps
} from "@chakra-ui/react"

import {useContext} from "react"
import { UserContext } from "../../../contexts/userContext"

const ChannelSelector = (props: SelectProps) => {
  const {guild} = useContext(UserContext)

  return <Box overflowY="auto" maxH="160px" minw="50%">
    <Select {...props}>
        {guild.channels.map(role => {
          return <option key={role.id} value={role.id}>{role.name}</option>
        })}
    </Select>
  </Box>
}


export default ChannelSelector