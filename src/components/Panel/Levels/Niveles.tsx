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
import { UpdateStatus } from "../Other";
import useApi, {useUpdateApi} from "./../API"
import { useDebounce } from "use-debounce"
import { useEffect, useState } from "react"
import { loadingData, LoadStatus } from "./../Other"
import ChannelSelectorMultiple from "./../Other/ChannelSelectorMultiple"

const Levels = () => {
  const {data, loading, error} = useApi("/stats/levels")
  const [newData, setNewData] = useState<Levels>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const [stringValue, setStringValue] = useState("")

  const updateStatus = useUpdateApi("/stats/updateLevels", debounceData, data)


  useEffect(() => {
    let _mounted = true
    if(data && _mounted){
      setNewData(data)
      setStringValue(String(data.levels))
    }

    return () => {
      _mounted = false
    }
  }, [data])

  useEffect(() => {
    if(newData !== null && Number(stringValue) && Number(stringValue) !== newData.levels)
      setNewData(oldData => ({...oldData, levels: Number(stringValue)}))

  }, [stringValue, newData])

  if(loadingData(loading, error, !data)){
    return <LoadStatus load={loading} error={error} data={!data}/>
  }

  return <>
    <Box textAlign="center">
      <Heading>Niveles</Heading>
      <Text>Las opciones de niveles te permiten habilitar un sistema de niveles y editar los canales admitidos.</Text>
    </Box>
    <br/>

    <Box>
      <Heading textAlign="center" size="md" as="h3">Niveles</Heading>
      <Text textAlign="center">
        Multiplicador de experiencia, 0 para desactivar.
      </Text>
      <Box mt="3" mx="30%">
        <NumberInput 
          value={stringValue}
          onChange={(v) => {setStringValue(v)}}
          precision={1}
          size="sm"
          min={0}
          max={10}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>      
      </Box>
    </Box>

    <Box mt="3">
      <Heading textAlign="center" size="md" as="h3">Canales</Heading>
      <Text textAlign="center">
        Canales a <b>excluir</b>.
      </Text>
      <Box mx="5%" px="5%" maxH="200px" my="3" overflowY="auto">
        <ChannelSelectorMultiple defaultValue={newData.channels} includeVoice={true} onChange={(sor) => {
          setNewData(oldData => ({...oldData, channels: sor.map(s => {return String(s)})}))
        }}/>
      </Box>
    </Box>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Levels