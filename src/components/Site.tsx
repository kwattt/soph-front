import { BrowserRouter, Switch, Route} from "react-router-dom";

import {Box} from '@chakra-ui/react'

import Nav from './Nav'
import Homepage from './Homepage';
import Footer from "./Page/Footer";

const Site = () => {
  return <>
    <BrowserRouter>
      <Nav/>
      <Box
        display="flex"
        flexDir="column"
        minH="calc(92vh - 93px)"
      >
        <Switch>
          <Route path="/" component={Homepage} exact/>
          <Route path="*" component={c404}/>      
        </Switch>
      </Box>
      <Footer/>
    </BrowserRouter>
  </>
}

const c404 = () => {
  return <>Error</>
}


export default Site;