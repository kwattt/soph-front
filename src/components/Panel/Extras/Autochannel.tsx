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

interface AutochannelID extends Autochannel {
  id: number
}

const Autochannel = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/misc/autochannel")
  const [newData, setNewData] = useState<Autochannel[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/misc/updateAutochannel", debounceData, data)

  const [currentSocial, setCurrentSocial] = useState<AutochannelID | undefined>(undefined)
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

  const handleChangeOrigen = (e: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, origenchannel: e})
  }

  const handleChangeTarget = (e: any) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, targetchannel: e})
  }

  const deleteElement = (id:number) => {
    var newArray = [...newData]
    newArray.splice(id, 1)
    setNewData(newArray)
  }

  const onModalClose = () => {
    if(currentSocial!==undefined){
      var newvals = [...newData]  
      const {origenchannel, targetchannel} = currentSocial
      newvals[currentSocial.id] = {origenchannel, targetchannel}
      setNewData(newvals)
      setCurrentSocial(undefined)
    }
  }


  const newElement = () => {
    var newArray = [...newData, {origenchannel: "0", targetchannel: ""}]
    setNewData(newArray)
  }

  const getChannelName = (id: string) => {
    const channelName = guild.channels.find(c => c.id === id)
    if(channelName !== undefined)
      return channelName.name
    return "Ninguno"
  }

  return <>
    <Box textAlign="center">
      <Heading>Autochannel</Heading>

      <ToolText tooltip={`${guild.limits.autochannel} canales de voz.`}>
        Limites
      </ToolText>

      <Text>Opciones para mostrar canales de texto al momento de ingresar un chat de voz.</Text>
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
          {getChannelName(item.origenchannel)}
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
              <Heading size="sm" as="h5">Canal</Heading>

              <Heading size="sm" as="h5" mt="2">Canal de origen</Heading>
              <ChannelSelector
                onChange={(e) => {handleChangeOrigen(e.target.value)}}
                value={currentSocial.origenchannel}
                size="sm"
                onlyVoice={true}
              />

              <Heading size="sm" as="h5" mt="2">Canal a mostrar</Heading>
              <ChannelSelector
                onChange={(e) => {handleChangeTarget(e.target.value)}}
                value={currentSocial.targetchannel}
                size="sm"
              />

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
        limit={guild.limits.autochannel}
        currentl={newData.length}
        onClick={newElement}
      />
    </Center>

    <UpdateStatus status={updateStatus}/>
  </>

}

export default Autochannel;