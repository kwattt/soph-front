import { BrowserRouter, Switch, Route} from "react-router-dom";

import {Box} from '@chakra-ui/react'

import Nav from './Nav'
import Homepage from './Homepage';
import Footer from "./Page/Footer";
import Panel from "./Panel";
import Terms from "./Legal/Terms";
import Privacy from "./Legal/Privacy";

const Site = () => {
  return <>
    <BrowserRouter>
      <Nav/>
      <Box
        display="flex"
        flexDir="column"
        minH="calc(92vh - 120px)"
        my="5"
        mx={["2%", "5%", "8%", "11%"]}
      >
        <Switch>
          <Route path="/" component={Homepage} exact/>
          <Route path="/panel" component={Panel} exact/>
          <Route path="/terms" component={Terms}/>
          <Route path="/privacy" component={Privacy}/>
          <Route path="*" component={c404}/>      
        </Switch>
      </Box>
      <Footer/>
    </BrowserRouter>
  </>
}

const c404 = () => {
  return <>Página inexistente!</>
}


export default Site;