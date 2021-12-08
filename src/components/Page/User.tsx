import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import {useState, useEffect} from 'react'
import { loadingData, LoadStatus } from "./../Panel/Other"

import { useDebounce } from 'use-debounce'
import useApi, { useUpdateApi } from '../Panel/API'

const User = ({isOpen, onClose} : {isOpen: boolean, onClose: () => void}) => {
  const {data, loading, error} = useApi("/user/info")
  const [user, setUser] = useState<User>(data)  
  const [debounceData] = useDebounce(user, 500)
  useUpdateApi("/user/updateInfo", debounceData, data)

  useEffect(() => {
    let _mounted = true

    if(data && _mounted) 
      setUser(data)

    return () => {
      _mounted = false
    }
  }, [data])

  const handleUser = () => {
    if(user.month === undefined)
      setUser(oldUser => ({...oldUser, month: 1, day: 1}))
    else 
      setUser(oldUser => ({...oldUser, month: undefined, day: undefined}))
  }

  if(loadingData(loading, error, !data)){
    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <LoadStatus load={loading} error={error} data={!data}/>
    </Modal>
    
  }

  return <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cuenta {user?.username}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Heading size="sm" as="h4">Cumpleaños 🎈</Heading>
          {user.month !== undefined ?  <>

            <Heading size="sm" as="h5" mt="2">Mes</Heading>
            <NumberInput 
              size="sm" 
              onChange={(e) => {setUser(oldUser => ({...oldUser, month: Number(e)}))}} 
              value={user.month}
              min={1}
              max={12} 
            >
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>          
            <Heading size="sm" as="h5" mt="2">Dia</Heading>
            <NumberInput 
              size="sm" 
              onChange={(e) => {setUser(oldUser => ({...oldUser, day: Number(e)}))}} 
              value={user.day}
              min={1}
              max={31} 
            >
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>          

          </>:
            'Cumpleaños deshabilitado!'
          }
        </ModalBody>

        <ModalFooter>
          <Button 
            size="sm" 
            borderRadius="0" 
            colorScheme={user.month !== undefined ? "red" : "green"} 
            mr={3} 
            onClick={handleUser}
          >
            {user.month !== undefined ? "Desactivar" : "Activar"}
          </Button>          

        <Button size="sm" borderRadius="0" colorScheme='blue' mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  </>
}

export default User