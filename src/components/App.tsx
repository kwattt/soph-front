import {ChakraProvider} from '@chakra-ui/react'
import Site from './Site';

function App() {
  return (
    <div>
      <ChakraProvider>
        <Site/>
      </ChakraProvider>
    </div>
  );
}

export default App;
