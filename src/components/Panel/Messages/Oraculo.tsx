import { 
  Box,
  Input,
  Flex,
  Button,
  Heading,
  Center,
  IconButton,
} from "@chakra-ui/react"

import { useContext, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { ToolText, UpdateStatus } from "../Other"
import { loadingData, LoadStatus } from "./../Other"
import useApi, {useUpdateApi} from "./../API"

import { MdDeleteForever } from 'react-icons/md'
import { UserContext } from "../../../contexts/userContext"
import ParsedInput from "../Other/ParsedInput"

const Oraculo = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/messages/oraculo")
  const [newData, setNewData] = useState<Oraculo[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/messages/updateOraculo", debounceData, data)

  useEffect(() => {
    if(data)
      setNewData(data)
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
    </Box>
    <br/>

    <Box mx="10%">
      {newData.map((or: Oraculo, id: number) => {
        return <Flex key={"ora"+id} mb="1">
          <Input value={or.msg} maxLength={200} borderRadius="0" size="sm" onChange={(e) => {handleChange(e, id)}}/>
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
    
    <Box mx="10%">
      <Flex>
      <ParsedInput text="lol! el {} es tonto! {} "/>
      </Flex>
    </Box>

    <Center>
      <Button
        onClick={newElement} 
        my="2"
        color="green.400" 
        size="sm" 
        borderRadius="0"
      >
        Nuevo
      </Button>
    </Center>


    <UpdateStatus status={updateStatus}/>
  </>
}

export default Oraculo