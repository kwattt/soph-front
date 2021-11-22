import {
  Box,
  Stack,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps
} from "@chakra-ui/react"

import {useContext} from "react"
import { UserContext } from "../../../contexts/userContext"

interface ChannelSelectorMultipleProps extends CheckboxGroupProps {
  includeVoice?: boolean
}

const ChannelSelectorMultiple = (props: ChannelSelectorMultipleProps) => {
  const {guild} = useContext(UserContext)

  if(props.includeVoice)
    return <Box overflowY="auto" maxH="160px" minw="50%">
      <CheckboxGroup {...props}>
        <Stack spacing={1}>
          {guild.channels.map(role => {
            return <Checkbox key={role.id} value={role.id}>{role.name}</Checkbox>
          })}
        </Stack>
      </CheckboxGroup>
    </Box>
  else 
    return <Box overflowY="auto" maxH="160px" minw="50%">
      <CheckboxGroup {...props}>
        <Stack spacing={1}>
          {guild.channels.filter(channel => {return channel.type === "GUILD_TEXT"}).map(role => {
            return <Checkbox key={role.id} value={role.id}>{role.name}</Checkbox>
          })}
        </Stack>
      </CheckboxGroup>
    </Box>
}


export default ChannelSelectorMultiple