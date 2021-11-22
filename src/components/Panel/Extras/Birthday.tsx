import { 
  Box,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import {  UpdateStatus } from "../Other"
import { loadingData, LoadStatus } from "./../Other"
import useApi, {useUpdateApi} from "./../API"

import ParsedArea from "../Other/ParsedArea"
import ChannelSelector from "../Other/ChannelSelector"

const Birthday = () => {
  const {data, loading, error} = useApi("/misc/birthday")
  const [newData, setNewData] = useState<Birthday>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/misc/updateBirthday", debounceData, data)

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

  return <>
    <Box textAlign="center">
      <Heading>Cumpleaños</Heading>
      <Text>Las opciones de cumpleaños te permiten cambiar la celebración de un cumpleaños.</Text>
    </Box>
    <br/>

    <Box mx="10%" >
      <Heading textAlign="center" mb="1" size="sm" as="h3">Mensaje</Heading>
      
      <ParsedArea
        text={newData.bdaymsg}
        onChange={(e: any) => setNewData({...newData, bdaymsg: e.target.value})}
      />

      <Heading textAlign="center" my="1" size="sm" as="h3">Canal</Heading>
      <ChannelSelector value={newData.birthday} size="sm" onChange={(e) => {setNewData({...newData, birthday: e.target.value})}}/>

      <Heading textAlign="center" my="1" size="sm" as="h3">UTC diff</Heading>
      <NumberInput 
        size="sm" 
        onChange={(e) => {setNewData({...newData, bdayutc: Number(e)})}} 
        value={newData.bdayutc} 
        max={14} 
        min={-12} 
      >
        <NumberInputField disabled={true}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

    </Box>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Birthday