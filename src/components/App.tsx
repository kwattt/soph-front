import {ChakraProvider} from '@chakra-ui/react'
import Site from './Site';
import theme from './../theme';
import UserProvider from '../contexts/userContext';

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Site/>
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
