import { 
  Box,
  Flex,
  Heading,
  Center,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { ToolText, UpdateStatus } from "../Other";
import useApi, {useUpdateApi} from "./../API"
import { useDebounce } from "use-debounce"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/userContext";
import { loadingData, LoadStatus } from "./../Other"
import { MdDeleteForever } from 'react-icons/md'
import ParsedInput from "../Other/ParsedInput";
import AddButton from "../Other/AddButton";
import ChannelSelector from "../Other/ChannelSelector";

interface WelcomeContent {
  channel: string,
  content: WMessage[]
}

const Welcome = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/messages/welcome")
  const [newData, setNewData] = useState<WelcomeContent>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/messages/updateWelcome", debounceData, data)

  useEffect(() => {
    let _mounted = true
    
    if(data && _mounted) 
      setNewData(data)

    return () => {
      _mounted = false
    }

  }, [data])

  if(loadingData(loading, error, !data)){
    return <LoadStatus load={loading} error={error} data={!data}/>
  }


  const handleChangeText = (e: any, id: number) => {
    var newstate = [...newData.content]
    newstate[id].msg = e.target.value
    setNewData(oldData => ({channel: oldData.channel, content: newstate}))
  }

  const deleteElement = (id:number) => {
    var newArray = [...newData.content]
    newArray.splice(id, 1)
    setNewData(oldData => ({channel: oldData.channel, content: newArray}))
  }

  const newElement = (type: number) => {
    var newArray = [...newData.content, {type: type, msg: "Nuevo"}]
    setNewData(oldData => ({channel: oldData.channel, content: newArray}))
  }

  const onChannelChange = (channel: string) => {
    setNewData(oldData => ({channel: channel, content: oldData.content}))
  }

  return <>
    <Box textAlign="center">
      <Heading>Entrada/Salida</Heading>
      <ToolText tooltip={`${guild.limits.welcome} mensajes de máximo 200 carácteres.`}>
        Limites
      </ToolText>
      <Text>Las opciones de Entrada/Salida te permite los mensajes de entrada/salida de un usuario al servidor.</Text>
    </Box>
    <br/>

    <Box>

      <Box>
      <Heading textAlign="center" size="md" as="h3">Canal</Heading>
        <Box mx="5%" px="5%" maxH="200px" overflowY="auto">
    
        <ChannelSelector
            onChange={(e) => {onChannelChange(e.target.value)}}
            value={newData.channel}
            size="sm"
        />

        </Box>
      </Box>

      <Heading textAlign="center" size="md" as="h3">Entrada</Heading>
      <Box mx="5%" px="5%" maxH="200px" overflowY="auto">
      {newData.content.map((m, i) => {

        if(m.type === 1)
          return ""

        return <Box key={`re+${i}`} mt="2">
        <Flex>
          <ParsedInput 
            maxLength={50}
            overflow="hidden"
            text={m.msg} 
            size="sm" 
            onChange={(e) => {handleChangeText(e, i)}}
          />
          <IconButton 
            onClick={()=>{deleteElement(i)}} 
            aria-label="Eliminar" 
            size="sm"
            color="red.400"
            borderRadius="0"
            icon={<MdDeleteForever/>}
          />
          </Flex>
        </Box>
      })}
      </Box>

      <Center>
        <AddButton
          onClick={()=>{newElement(0)}}
          currentl={newData.content.length}
          limit={guild.limits.welcome}
        />
      </Center>
    </Box>

    <Box>
      <Heading textAlign="center" size="md" as="h3">Salida</Heading>
      <Box mx="5%" px="5%" maxH="200px" overflowY="auto">
      {newData.content.map((m, i) => {

        if(m.type === 0)
          return ""

        return <Box key={`re+${i}`} mt="2">
        <Flex>
          <ParsedInput 
            maxLength={50}
            overflow="hidden"
            text={m.msg} 
            size="sm" 
            onChange={(e) => {handleChangeText(e, i)}}
          />
          <IconButton 
            onClick={()=>{deleteElement(i)}} 
            aria-label="Eliminar" 
            size="sm"
            color="red.400"
            borderRadius="0"
            icon={<MdDeleteForever/>}
          />
          </Flex>
        </Box>
      })}
      </Box>

      <Center>
        <AddButton
          onClick={()=>{newElement(1)}}
          currentl={newData.content.length}
          limit={guild.limits.welcome}
        />
      </Center>
    </Box>

    <UpdateStatus status={updateStatus}/>

  </>
}

export default Welcome