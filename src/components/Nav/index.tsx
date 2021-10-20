import logo from './../../static/logo.webp'

import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  IconButton,
  Select,
} from '@chakra-ui/react';

import { useHistory  } from "react-router-dom"

import {MdLogout} from 'react-icons/md'
import LoggedMenu from './LoggedMenu'

const Nav = () => {
  const Logged = true
  const history = useHistory()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>

        <Box>
          <Image 
            h="14" 
            src={logo} 
            alt="logo"
            cursor="pointer"
            onClick={()=> {history.push('/')}}
          />
        </Box>

        {Logged ? <LoggedMenu/> : 
          <IconButton
          aria-label="Desconectarse"
          icon={<MdLogout />}
        />
        }

      </Flex>

    </Box>
  )
}

export default Nav