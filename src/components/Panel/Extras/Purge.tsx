import { 
  Box,
  Heading,
  Text,
  Center,
  Button,
  useDisclosure,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

import { useEffect, useState, useContext } from "react"
import { useDebounce } from "use-debounce"
import {  ToolText, UpdateStatus } from "../Other"
import { loadingData, LoadStatus } from "./../Other"
import useApi, {useUpdateApi} from "./../API"
import { MdDeleteForever } from 'react-icons/md'

import ChannelSelector from "../Other/ChannelSelector"
import { UserContext } from "../../../contexts/userContext"
import AddButton from "../Other/AddButton"

interface PurgeID extends Purge {
  id: number
}

const Purge = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/misc/purge")
  const [newData, setNewData] = useState<Purge[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/misc/updatePurge", debounceData, data)

  const [currentSocial, setCurrentSocial] = useState<PurgeID | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    let _mounted = true

    if(data && _mounted) 
      setNewData(data)

    return () => {
      _mounted = false
    }
  }, [data])

  useEffect(() => {
    if(currentSocial!==undefined){
      if(!isOpen)  
        onOpen()
    } else onClose() 
  }, [currentSocial, onOpen, isOpen, onClose])

  if(loadingData(loading, error, !data)){
    return <LoadStatus load={loading} error={error} data={!data}/>
  }

  const getChannelName = (id: string) => {
    const channelName = guild.channels.find(c => c.id === id)
    if(channelName !== undefined)
      return channelName.name
    return "Ninguno"
  }


  const handleChangeChannel = (e: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, channel: e})
  }

  const handleChangeUTC = (e: number) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, utc: e})
  }

  const handleChangeHour = (e: number) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, hour: e})
  }

  const handleChangeMinute = (e: number) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, minute: e})
  }

  const deleteElement = (id:number) => {
    var newArray = [...newData]
    newArray.splice(id, 1)
    setNewData(newArray)
  }

  const onModalClose = () => {
    if(currentSocial!==undefined){
      var newvals = [...newData]  
      const {channel, utc, hour, minute} = currentSocial
      newvals[currentSocial.id] = {channel, utc, hour, minute}
      setNewData(newvals)
      setCurrentSocial(undefined)
    }
  }

  const newElement = () => {
    var newArray = [...newData, {channel: "0", utc: 0, hour: 0, minute: 0}]
    setNewData(newArray)
  }

  return <>
    <Box textAlign="center">
      <Heading>Autolimpiar</Heading>
      <ToolText tooltip={`${guild.limits.purge} canales de texto.`}>
        Limites
      </ToolText>

      <Text>Opciones para programar eliminación de mensajes en canales de texto.</Text>

    </Box>
    <br/>

    <Box mx="10%">
      <Stack spacing="1">
      {newData.map((item, id) => {
        return <Flex key={"bfs"+id}> 
        <Button  
          width="100%"
          onClick={() => setCurrentSocial({...item, id: id})}
          size="sm"
          borderRadius="0"
          >
          {getChannelName(item.channel)}
        </Button>
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
      </Stack>
    </Box>
    {currentSocial !== undefined && 
        <Modal isOpen={isOpen} onClose={() => {onModalClose()}}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>

              <Heading size="sm" as="h5" mt="2">Canal</Heading>
              <ChannelSelector
                onChange={(e) => {handleChangeChannel(e.target.value)}}
                value={currentSocial.channel}
                size="sm"
              />

              <Heading size="sm" as="h5" mt="2">UTC</Heading>
              <NumberInput 
                size="sm" 
                onChange={(e) => {handleChangeUTC(Number(e))}} 
                value={currentSocial.utc} 
                max={14} 
                min={-12} 
              >
                <NumberInputField disabled={true}/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Heading size="sm" as="h5" mt="2">Hora</Heading>
              <NumberInput 
                size="sm" 
                onChange={(e) => {handleChangeHour(Number(e))}} 
                value={currentSocial.hour} 
                max={23} 
                min={0} 
              >
                <NumberInputField disabled={true}/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Heading size="sm" as="h5" mt="2">Minuto</Heading>
              <NumberInput 
                size="sm" 
                onChange={(e) => {handleChangeMinute(Number(e))}} 
                value={currentSocial.minute} 
                max={59} 
                min={0} 
              >
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

            </ModalBody>
            <ModalFooter>
              <Button onClick={() => {onModalClose()}} size="sm" borderRadius="0">
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>    
      }


    <Center>
      <AddButton
        limit={guild.limits.purge}
        currentl={newData.length}
        onClick={newElement}
      />
    </Center>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Purge