import {
  Tag,
  Tooltip
} from "@chakra-ui/react"
import { ReactChild, ReactChildren } from "react"

const CustomCard = ({children, tooltip} : {children: ReactChild | ReactChildren, tooltip: string}) => {
  return <Tooltip label={tooltip}>
    <Tag colorScheme="yellow">{children}</Tag>
  </Tooltip> 
}


export default CustomCard