
import { Tab } from '@chakra-ui/react'

const SwitchTab = ({view, title} : {view: Views, title: string}) => {
  return <Tab value={view}>{title}</Tab>
}

export default SwitchTab