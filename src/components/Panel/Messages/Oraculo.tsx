import { 
  Box,
  Flex,
  Heading,
  Center,
  IconButton,
  Kbd,
  Text,
} from "@chakra-ui/react"

import { useContext, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { ToolText, UpdateStatus } from "../Other"
import { loadingData, LoadStatus } from "./../Other"
import useApi, {useUpdateApi} from "./../API"

import { MdDeleteForever } from 'react-icons/md'
import { UserContext } from "../../../contexts/userContext"
import ParsedInput from "../Other/ParsedInput"
import AddButton from "../Other/AddButton"

const Oraculo = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/messages/oraculo")
  const [newData, setNewData] = useState<Oraculo[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/messages/updateOraculo", debounceData, data)

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

  const handleChange = (e: any, id: number) => {
    var newstate = [...newData]
    newstate[id].msg = e.target.value
    setNewData(newstate)
  }

  const deleteElement = (id:number) => {
    var newArray = [...newData]
    newArray.splice(id, 1)
    setNewData(newArray)
  }

  const newElement = () => {
    var newArray = [...newData, {msg: "Nuevo"}]
    setNewData(newArray)
  }

  return <>
    <Box textAlign="center">
      <Heading>Oraculo</Heading>
      <ToolText tooltip={`${guild.limits.oraculo} respuestas de máximo 200 carácteres`}>
        Limites
      </ToolText>
      <Text>Las opciones de oráculo te permiten editar los mensajes de respuesta de <Kbd>/oraculo</Kbd></Text>
    </Box>
    <br/>

    <Box mx="10%" maxH="230px" overflowY="auto">
      {newData.map((or: Oraculo, id: number) => {
        return <Flex key={"ora"+id} mb="1">
          <ParsedInput 
            overflow="hidden"
            text={or.msg} 
            maxLength={200} 
            size="sm" 
            onChange={(e) => {handleChange(e, id)}}
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
      })}
    </Box>
    
    <Center>
      <AddButton
        limit={guild.limits.oraculo}
        currentl={newData.length}
        onClick={newElement}
      />
    </Center>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Oraculo