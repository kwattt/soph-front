import {
  Box,
  Flex,
  useBreakpointValue
} from "@chakra-ui/react"
import { ReactChild, ReactChildren } from "react";

export const SectionC = ({children} : {children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]}) => {
  const size = useBreakpointValue({
    base: "90%",
    sm: "80%",
    md: "75%",
    lg: "46%",
    xl: "40%"
  })

  return <Box
    borderLeft="solid 1px rgba(255, 255, 255, 0.2)"
    padding="4"
    maxW={size}
    mx="2"
    my="2"
  >
    {children}
  </Box>
}

const Section = ({children} : {children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]}) => {
  return <Flex
    flexFlow="wrap"
  >
    {children}
  </Flex>
}

export default Section