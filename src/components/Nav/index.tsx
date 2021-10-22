import logo from './../../static/logof.png'

import {
  Box,
  Flex,
  useColorModeValue,
  Avatar,
  IconButton,
} from '@chakra-ui/react';

import { useHistory } from "react-router-dom"

import {MdLogin} from 'react-icons/md'
import LoggedMenu from './LoggedMenu'
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const Nav = () => {
  const {logged, setCurrent} = useContext(UserContext)
  const history = useHistory()

  const redirectToHomepage = () => {
    if(logged){
      setCurrent(0)
    }
    history.push('/')
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>

        <Box>
          <Avatar
            size="md"
            src={logo} 
            alt="logo"
            cursor="pointer"
            border="solid 1px gray"
            onClick={redirectToHomepage}
          />
        </Box>

        {logged ? <LoggedMenu/> : 
          <IconButton
          onClick={()=>{window.location.href = process.env.REACT_APP_BASE_URL + "/auth/login"}}
          aria-label="Conectarse"
          icon={<MdLogin />}
        />
        }

      </Flex>

    </Box>
  )
}

export default Nav