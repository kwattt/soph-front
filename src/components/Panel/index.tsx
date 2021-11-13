import { useState, useContext, useEffect } from "react";
import Panel from "./Panel";
import Switcher from "./Switcher/Switcher";

import {UserContext} from './../../contexts/userContext'
import { 
  useBreakpointValue,
  Box,

  Grid,
  GridItem
} from "@chakra-ui/react";

const PanelWrap = () => {
  const [view, setView] = useState<Views>('info')
  const deviceMobile = useBreakpointValue({base: true, md: false})
  const {current, guild} = useContext(UserContext)

  useEffect(() => {
    setView('info')
  }, [current, guild])

  if(deviceMobile)
    return <Box>
      <Switcher setView={setView} view={view}/>
      <Box mt="5">
        <Panel view={view} /> 
      </Box>
    </Box>

  return <>
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(6, 1fr)"
    >
      <GridItem colSpan={1}>
        <Switcher setView={setView} view={view}/>
      </GridItem>
      <GridItem colSpan={5}>
        <Panel view={view} /> 
      </GridItem>
    </Grid>
  </>
}

export default PanelWrap