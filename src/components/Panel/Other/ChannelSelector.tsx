import {
  Box,
  Select,
  SelectProps
} from "@chakra-ui/react"

import {useContext} from "react"
import { UserContext } from "../../../contexts/userContext"

interface ChannelSelectorProps extends SelectProps {
  includeVoice?: boolean
}

const ChannelSelector = (props: ChannelSelectorProps) => {
  const {guild} = useContext(UserContext)

  if(props.includeVoice)
    return <Box overflowY="auto" maxH="160px" minw="50%">
      <Select {...props}>
          {guild.channels.map(role => {
            return <option key={role.id} value={role.id}>{role.name}</option>
          })}
      </Select>
    </Box>
  else 
    return <Box overflowY="auto" maxH="160px" minw="50%">
      <Select {...props}>
          <option value="0">Ninguno</option>
          {guild.channels.filter(channel => {return channel.type === "GUILD_TEXT"}).map(role => {
            return <option key={role.id} value={role.id}>{role.name}</option>
          })}
      </Select>
    </Box>
}


export default ChannelSelector