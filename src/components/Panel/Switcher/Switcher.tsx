import {
  Tabs,
  TabList,
  useBreakpointValue,
  UseTabsProps,
  PositionProps,
  Box,
  ResponsiveValue
} from "@chakra-ui/react"

import SwitchTab from "./SwitchTab"
import {views} from './../../../constants'

const Switcher = ({setView, view} : {setView: React.Dispatch<React.SetStateAction<Views>>, view: Views}) => {
  const tabOrientation : UseTabsProps["orientation"] = useBreakpointValue({'base': 'horizontal', 'md': 'vertical'})
  const tabPosition : ResponsiveValue<PositionProps["position"]> | undefined = useBreakpointValue({'base': 'static', 'md': 'fixed'})

  return <Box overflowX="auto"> 
    <Tabs
      position={tabPosition}
      orientation={tabOrientation}
      index={views.indexOf(view)}
      onChange={(value)=> {
        setView(viewsDict[value])
      }}
    >   
      <TabList>
        <SwitchTab view={'info'} title="Servidor"/>
        <SwitchTab view={'messages'} title="Mensajes"/>
        <SwitchTab view={'socials'} title="Sociales"/>
        <SwitchTab view={'extras'} title="Otros"/>
        <SwitchTab view={'levels'} title="Niveles"/>
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
