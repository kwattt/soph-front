import { 
  Box,
  Flex,
  Heading,
  Center,
  IconButton,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  RadioGroup,
  Radio
} from "@chakra-ui/react"

import { ToolText, UpdateStatus } from "../Other";
import useApi, {useUpdateApi} from "./../API"
import { useDebounce } from "use-debounce"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/userContext";
import { loadingData, LoadStatus } from "./../Other"
import { MdDeleteForever } from 'react-icons/md'
import AddButton from "../Other/AddButton";
import ChannelSelector from "../Other/ChannelSelector";

interface TwitterID extends Twitter {
  id: number
}

const Twitter = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/socials/Twitter")
  const [newData, setNewData] = useState<Twitter[]>(data)
  const [debounceData] = useDebounce(newData, 800)
  const updateStatus = useUpdateApi("/socials/updateTwitter", debounceData, data)

  const [currentSocial, setCurrentSocial] = useState<TwitterID | undefined>(undefined)
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

  const deleteElement = (id:number) => {
    var newArray = [...newData]
    newArray.splice(id, 1)
    setNewData(newArray)
  }

  const newElement = () => {
    var newArray = [...newData, {channel: "", name: "Nuevo", type: 0}]
    setNewData(newArray)
  }

  const onNameChange = (name: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, name})
  }

  const onChannelChange = (channel: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, channel})
  }

  const onTypeChange = (type: number) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, type})
  }

  const onModalClose = () => {
    if(currentSocial!==undefined){
      var newvals = [...newData]  
      const {channel, name, type} = currentSocial
      newvals[currentSocial.id] = {channel, name, type}
      setNewData(newvals)
      setCurrentSocial(undefined)
    }
  }

  return <>
    <Box textAlign="center">
      <Heading>Twitter</Heading>
      <ToolText tooltip={`${guild.limits.socials} usuarios.`}>
        Limites
      </ToolText>
      <Text>Las opciones te permiten modificar las alertas sobre usuarios de Twitter</Text>
    </Box>
    <br/>

    <Box mx="5%" px="5%" maxH="240px" overflowY="auto">
    {newData.map((element, id) => {
      return <Box key={`re+${id}`} mt="1">
        <Flex>
          <Button 
            variant="outline"
            width="100%"
            children={element.name} 
            size="sm"
            borderRadius="0"
            onClick={() => {
              setCurrentSocial({...element, id: id})
            }}
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
        </Box>
      })}
      {currentSocial !== undefined && 
        <Modal isOpen={isOpen} onClose={() => {onModalClose()}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>:{currentSocial.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size="sm" as="h5">Usuario</Heading>
              <Input size="sm" value={currentSocial.name} onChange={(e) => {onNameChange(e.target.value)}}/>

              <Heading size="sm" as="h5" mt="2">Canal de anuncio</Heading>
              <ChannelSelector
                onChange={(e) => {onChannelChange(e.target.value)}}
                value={currentSocial.channel}
                size="sm"
              />

              <Heading size="sm" as="h5" mt="2">Alerta</Heading>
              <RadioGroup value={String(currentSocial.type)} onChange={(e) => {onTypeChange(Number(e))}}>
                <Radio mr="2" value="0">Ninguna</Radio>
                <Radio mr="2" value="1">@here</Radio>
                <Radio mr="2" value="2">@everyone</Radio>
              </RadioGroup>

            </ModalBody>
            <ModalFooter>
              <Button onClick={() => {onModalClose()}} size="sm" borderRadius="0">
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>    
      }

    </Box>

    <Center>
      <AddButton
        onClick={()=>{newElement()}}
        currentl={newData.length}
        limit={guild.limits.socials}
      />
    </Center>
    <UpdateStatus status={updateStatus}/>
  </>
}

export default Twitter;