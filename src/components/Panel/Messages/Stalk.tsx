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
import RoleSelector from "../Other/RoleSelectorMultiple";

type StringOrNumber = string | number

const Stalk = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/misc/stalk")
  const [newData, setNewData] = useState<Stalk>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/misc/updateStalk", debounceData, data)

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

  const updateRoles = (roles: StringOrNumber[]) => {
    setNewData(oldData => ({...oldData, roles: roles.map(r => r.toString())}))
  }

  const handleChangeText = (e: any, id: number) => {
    var newstate = [...newData.messages]
    newstate[id] = e.target.value
    setNewData(oldData => ({...oldData, messages: newstate}))
  }

  const deleteElement = (id:number) => {
    var newArray = [...newData.messages]
    newArray.splice(id, 1)
    setNewData(oldData => ({...oldData, messages: newArray}))
  }

  const newElement = (type: number) => {
    var newArray = [...newData.messages, "Nuevo"]
    setNewData(oldData => ({...oldData, messages: newArray}))
  }

  return <>
    <Box textAlign="center">
      <Heading>Stalk mensajes</Heading>
      <ToolText tooltip={`${guild.limits.stalkmsg} mensajes de máximo 200 carácteres.`}>
        Limites
      </ToolText>
      <Text>Las opciones de Stalk te permite agregar mensajes que se muestran aleatoriamente como respuesta. (0.1%)</Text>
    </Box>
    <br/>

    <Box>
      <Heading textAlign="center" size="md" as="h3">Roles</Heading>
      <Box mx="5%" px="5%">
        <RoleSelector
          onChange={(e) => {updateRoles(e)}}
          defaultValue={newData.roles}
        />    
      </Box>
    </Box>

    <Box mt="10">
      <Heading textAlign="center" size="md" as="h3">Mensajes</Heading>
      <Box mx="5%" px="5%" maxH="200px" overflowY="auto">
      {newData.messages.map((m, i) => {
        return <Box key={`re+${i}`} mt="2">
        <Flex>
          <ParsedInput 
            maxLength={50}
            overflow="hidden"
            text={m} 
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
          currentl={newData.messages.length}
          limit={guild.limits.welcome}
        />
      </Center>
    </Box>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Stalk