import { 
  Box,
  Input,
  Flex,
  Heading,
  Center
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { UpdateStatus } from "../Other"
import LoadStatus, { loadingData } from "../Other/LoadStatus"
import useApi, {useUpdateApi} from "./../API"

const Oraculo = () => {
  const {data, loading, error} = useApi("/messages/oraculo")
  const [newData, setNewData] = useState<Oraculo[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/messages/updateOraculo", debounceData, data)

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

  if(loadingData(loading, error, !data)){
    return <LoadStatus load={loading} error={error} data={!data}/>
  }

  return <>
    <Center> <Heading>Oraculo</Heading> </Center>
    <br/>

    <Box>
      {newData.map((or: Oraculo, id: number) => {
        return <Flex key={"ora"+id}>
          <Input value={or.msg} borderRadius="0" size="sm" onChange={(e) => {handleChange(e, id)}}/>
          <button onClick={()=>{deleteElement(id)}}>X</button>
        </Flex>
      })}
    </Box>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Oraculo