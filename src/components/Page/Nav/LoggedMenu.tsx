import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  useColorMode,
  Box,
  Heading,
  Select,
  useDisclosure
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import { MdLightMode, MdLogout, MdDarkMode, MdAccountCircle } from 'react-icons/md'
import { UserContext } from '../../../contexts/userContext';
import { randomColor } from '../../Other/Logo';
import { useHistory, useLocation } from 'react-router-dom';
import User from '../User';
const LMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, guilds, current, setCurrent } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname !== '/panel' && current !== '0')
      setCurrent('0')
  },[current, history, location.pathname, setCurrent])

  let banner = user.banner ? `url(${user.banner})` :  `linear-gradient(${randomColor()}, ${randomColor()})`
  return (<>
    <Box mx="5">
      <Select
        onChange={(e) => {
          setCurrent(e.target.value)
          if(e.target.value !== '0')
            history.push('/panel')
        }}
        borderRadius="3"
        value={current}
      >
        <option value='0'>Inicio 💕</option>
        {guilds.map(guild => {
          return <option key={`g+${guild.id}`} value={guild.id}>{guild.name}</option> 
        })}
      </Select>
    </Box>

    <Menu
      closeOnSelect={false}
    >
      <MenuButton
        cursor='pointer'
        minW='0'>
        <Avatar
          size='sm'
          src={user.avatar}
        />
      </MenuButton>

      <MenuList 
        alignItems={'center'}
      >
        <Center
          pos="relative"
          _before={{
            content: '""',
            bgImage: banner,
            bgSize: "cover",
            pos: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 0.5
          }}
        >
          <Box my="1">
            <Center>
              <Avatar
                size='xl'
                src={user.avatar}
                my="1"
              />
            </Center>
            <Center opacity={1}>
              <Heading size="md">{user.username}#{user.discriminator}</Heading>
            </Center>
          </Box>
        </Center>

        <MenuDivider/>

        <MenuItem
          icon={<MdAccountCircle/>}
          onClick={() => {onOpen()}}
        >Cuenta</MenuItem>
        <MenuItem
          onClick={toggleColorMode}
          icon={colorMode === 'dark' ? <MdDarkMode/> : <MdLightMode/>}
        >Modo oscuro:  {colorMode === 'dark' ? 'Sí' : 'No'}</MenuItem>
        <MenuItem
          onClick={()=>{window.location.href = process.env.REACT_APP_BASE_URL + "/auth/revoke"}}
          icon={<MdLogout/>}
        >Desconectarse</MenuItem>
      </MenuList>
      <User isOpen={isOpen} onClose={onClose}/>
    </Menu>
  </>)
}

export default LMenu