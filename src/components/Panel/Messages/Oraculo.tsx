import { 
  Box,
  Input,
  Flex,
  Heading,
  Center
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import useApi, {useUpdateApi} from "./../API"

const Oraculo = () => {
  const {data, loading, error} = useApi("/messages/oraculo")
  const [newData, setNewData] = useState<Oraculo[]>([])
  const [debounceData] = useDebounce(newData, 1200)
  //const updateStatus = updateApi("/messages/oraculo", debounceData)

  useEffect(() => {
    if(data)
      setNewData(data)
  }, [data])

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

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!.. actualizar, si el error persiste avisame XD</div>
  if(!data) return <div>No hay datos</div>

  return <Box 
    maxH="400px"
    overflowY="auto"
  >
    <Center> <Heading>Oraculo</Heading> </Center>
    <br/>

    <Box>
      {newData.map((or: Oraculo, id: number) => {
        return <Box>
          <Flex>
            <Input value={or.msg} key={"or"+id} borderRadius="0" size="sm" onChange={(e) => {handleChange(e, id)}}/>
            <button key={"ord"+id} onClick={()=>{deleteElement(id)}}>X</button>
          </Flex>
        </Box>
      })}
    </Box>
  </Box>
}

export default Oraculo