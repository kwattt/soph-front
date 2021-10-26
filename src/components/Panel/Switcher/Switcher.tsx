import {
  Tabs,
  TabList,
  useBreakpointValue,
  UseTabsProps,
  Box
} from "@chakra-ui/react"

import SwitchTab from "./SwitchTab"
import {views} from './../../../constants'

const Switcher = ({setView, view} : {setView: React.Dispatch<React.SetStateAction<Views>>, view: Views}) => {
  const tabOrientation : UseTabsProps["orientation"] = useBreakpointValue({'base': 'horizontal', 'md': 'vertical'})

  return <Box overflowX="auto"> 

    <Tabs
      orientation={tabOrientation}
      index={views.indexOf(view)}
      onChange={(value)=> {
        setView(viewsDict[value])
      }}
    >  
      <TabList>
        <SwitchTab view={'info'} title="Server Info"/>
        <SwitchTab view={'messages'} title="Mensajes"/>
        <SwitchTab view={'messages2'} title="Mensajes 2"/>
      </TabList>
    </Tabs>

  </Box>
}

const viewsDict = views.reduce(
  (acc: {[key: string]: Views}, view: Views, index: number) => ({
    ...acc,
    [String(index)]: view
  }),
  {}
)

export default Switcher
