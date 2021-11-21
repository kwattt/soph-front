import { 
  Box,
  Flex,
  Input,
  Heading,
  Center,
  IconButton,
  Kbd,
  Text,
  Textarea
} from "@chakra-ui/react"
import { ToolText, UpdateStatus } from "../Other";
import useApi, {useUpdateApi} from "./../API"
import { useDebounce } from "use-debounce"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/userContext";
import { loadingData, LoadStatus } from "./../Other"
import { MdDeleteForever } from 'react-icons/md'
import AddButton from "../Other/AddButton";

const Reminders = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/messages/reminders")
  const [newData, setNewData] = useState<Reminders[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/messages/updateReminders", debounceData, data)

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

  const handleChangeName = (e: any, id: number) => {
    var newstate = [...newData]
    newstate[id].name = e.target.value
    setNewData(newstate)
  }

  const handleChangeText = (e: any, id: number) => {
    var newstate = [...newData]
    newstate[id].message = e.target.value
    setNewData(newstate)
  }


  const deleteElement = (id:number) => {
    var newArray = [...newData]
    newArray.splice(id, 1)
    setNewData(newArray)
  }

  const newElement = () => {
    var newArray = [...newData, {name: "nuevo", message: "Nuevo"}]
    setNewData(newArray)
  }

  return <>
    <Box textAlign="center">
      <Heading>Reminders</Heading>
      <ToolText tooltip={`${guild.limits.autochannel} respuestas de máximo 500 carácteres, nombre de 50 carácteres.`}>
        Limites
      </ToolText>
      <Text>Las opciones de Reminder te permite configurar palabras que retornan un texto. <Kbd>!nombre-recordatorio</Kbd></Text>
    </Box>
    <br/>

    <Box mx="5%" px="5%" maxH="240px" overflowY="auto">
      {newData.map((element, id) => {
        return <Box key={`re+${id}`} mt="2">
          <Flex>
            <Input 
              maxLength={50}
              width="50%"
              overflow="hidden"
              value={element.name} 
              size="sm" 
              onChange={(e) => {handleChangeName(e, id)}}
            />
            <IconButton 
              onClick={()=>{deleteElement(id)}} 
              aria-label="Eliminar" 
              size="sm"
              color="red.400"
              borderRadius="0"
              icon={<MdDeleteForever/>}
            />
          </Flex>
          <Textarea
            maxLength={500} 
            borderRadius="0"
            value={element.message}
            onChange={(e) => {handleChangeText(e, id)}}
          />
          </Box>
      })}
    </Box>

    <Center>
      <AddButton
        currentl={newData.length}
        limit={guild.limits.autochannel}
        onClick={newElement} 
      />
    </Center>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Reminders;