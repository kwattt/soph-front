import { BrowserRouter, Switch, Route} from "react-router-dom";

import Nav from './Nav'
import Homepage from './Homepage';

const Site = () => {
  return <>
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route path="/" component={Homepage} exact/>
        <Route path="*" component={c404}/>      
      </Switch>
    </BrowserRouter>
  </>
}

const c404 = () => {
  return <>Error</>
}


export default Site;