import { 
  Box,
  Heading,
  Text,
  Center,
  Button,
  useDisclosure,
  Modal,
  ModalHeader,
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
  Select,
  Input,
  Stack,
  Kbd
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
import RoleSelector from "../Other/RoleSelector"

interface ShopID extends Shop {
  id: number
}

const Shop = () => {
  const {guild} = useContext(UserContext)

  const {data, loading, error} = useApi("/stats/shop")
  const [newData, setNewData] = useState<Shop[]>(data)
  const [debounceData] = useDebounce(newData, 1200)
  const updateStatus = useUpdateApi("/stats/updateShop", debounceData, data)

  const [currentSocial, setCurrentSocial] = useState<ShopID | undefined>(undefined)
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

  const handleChangeName = (e: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, name: e})
  }

  const handleChangeChannel = (e: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, channel: e})
  }

  const handleChangeType = (e: number) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, type: e})
  }

  const handleChangeRole = (e: string) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, role: e})
  }

  const handleChangePrice = (e: number) => {
    if(currentSocial!==undefined)
      setCurrentSocial({...currentSocial, price: e})
  }

  const deleteElement = (id:number) => {
    var newArray = [...newData]
    newArray.splice(id, 1)
    setNewData(newArray)
  }

  const onModalClose = () => {
    if(currentSocial !== undefined){
      var newvals = [...newData]  
      const {name, role, channel, price, type } = currentSocial
      newvals[currentSocial.id] = {name, role, channel, price, type}
      setNewData(newvals)
      setCurrentSocial(undefined)  
    }
  }

  const newElement = () => {
    var newArray = [...newData, {name: "Nuevo item", role: "0", channel: "0", price: 99999, type: 0}]
    setNewData(newArray)
  }

  return <>
    <Box textAlign="center">
      <Heading>Tienda</Heading>
      <ToolText tooltip={`${guild.limits.shops} elementos en la tienda.`}>
        Limites
      </ToolText>

      <Text>Opciones para canjear puntos del servidor. <Kbd>/tienda</Kbd> <Kbd>/comprar</Kbd> </Text>

    </Box>
    <br/>

    <Box mx="5%" px="5%" maxH="200px" overflowY="auto">
      <Stack spacing="1">
        {newData.map((item, id) => {
          return <Flex key={"bfs"+id}> 
          <Button  
            width="100%"
            onClick={() => setCurrentSocial({...item, id: id})}
            size="sm"
            borderRadius="0"
            >
              {item.name}
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

            <ModalHeader>
              {currentSocial.name ? currentSocial.name : "Nuevo item"}
            </ModalHeader>
            <ModalBody>

              <Heading size="sm" as="h5" mt="2">Nombre</Heading>
              <Input 
                size="sm"
                value={currentSocial.name} 
                onChange={(e) => handleChangeName(e.target.value)} 
              />

              <Heading size="sm" as="h5" mt="2">Canal de anuncio</Heading>
              <ChannelSelector
                onChange={(e) => {handleChangeChannel(e.target.value)}}
                value={currentSocial.channel}
                size="sm"
              />

              <Heading size="sm" as="h5" mt="2">Tipo</Heading>
              <Select
                onChange={(e) => {handleChangeType(Number(e.target.value))}}
                size="sm"
                value={String(currentSocial.type)}
              >
                <option value="0">Avisar</option>
                <option value="1">Otorgar rol</option>
              </Select>

              {currentSocial.type === 0 ? <>
                
                <Heading size="sm" as="h5" mt="2">Aviso</Heading>
                <Text>Avisar de que se ha comprado.</Text>

              </> : <>

                <Heading size="sm" as="h5" mt="2">Rol</Heading>
                <RoleSelector size="sm" 
                  value={String(currentSocial.role)}
                  onChange={(e) => {handleChangeRole(e.target.value)}}
                />

              </>}

              <Heading size="sm" as="h5" mt="2">Precio</Heading>
              <NumberInput 
                size="sm" 
                onChange={(e) => {handleChangePrice(Number(e))}} 
                value={currentSocial.price} 
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
        limit={guild.limits.shops}
        currentl={newData.length}
        onClick={newElement}
      />
    </Center>

    <UpdateStatus status={updateStatus}/>
  </>
}

export default Shop