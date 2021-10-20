import {ChakraProvider} from '@chakra-ui/react'
import Site from './Site';
import theme from './../theme';

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Site/>
      </ChakraProvider>
    </>
  );
}

export default App;
