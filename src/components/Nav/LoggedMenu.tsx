
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  useColorMode,
  Box
} from '@chakra-ui/react';

import {MdLightMode, MdLogout, MdDarkMode, MdAccountCircle} from 'react-icons/md'

const LMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (<>
    <Menu
      closeOnSelect={false}
    >
      <MenuButton
        alt
        cursor='pointer'
        minW='0'>
        <Avatar
          size='sm'
          src='https://cdn.discordapp.com/avatars/254672103465418752/033ef5838d35f8ce1ec8646f83e5ce4a.png'
        />
      </MenuButton>

      <MenuList 
        alignItems={'center'}
      >
        <Center 
          pos="relative"
          _before={{
            content: '""',
            bgImage:
              "url(https://pbs.twimg.com/media/FB4VtF7X0AQDxpQ?format=png&name=small)",
            bgSize: "cover",
            pos: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 0.5
          }}
        >
          <Avatar
          size='xl'
          src='https://cdn.discordapp.com/avatars/254672103465418752/033ef5838d35f8ce1ec8646f83e5ce4a.png'
          my="1"
        />
        </Center>

        <MenuDivider/>

        <MenuItem
          icon={<MdAccountCircle/>}
        >Cuenta</MenuItem>
        <MenuItem
          onClick={toggleColorMode}
          icon={colorMode === 'dark' ? <MdDarkMode/> : <MdLightMode/>}
        >Modo oscuro:  {colorMode === 'dark' ? 'Sí' : 'No'}</MenuItem>
        <MenuItem
          icon={<MdLogout/>}
        >Desconectarse</MenuItem>
      </MenuList>
    </Menu>
  </>)
}

export default LMenu