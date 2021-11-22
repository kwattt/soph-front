import { 
  Box,
  Skeleton,
  SkeletonText,
  Stack,
  Center
} from "@chakra-ui/react"

const LoadStatus = ({load, error, data} : {load: boolean, error: number | boolean, data: boolean}) => {
  return <Box alignContent="center" textAlign="center">
    {load && <Box>
      <Stack>
        <Skeleton h={6} mx="25%"/>
        <br/>
        <Skeleton h={3} startColor="gray.600" endColor="green.600"/>
        <SkeletonText noOfLines={6}/>
        <Skeleton h={2} mx={9}/>
        <Skeleton h={2} my={3} mx={5} startColor="gray.600" endColor="purple.600"/>
      </Stack>
      <Center>¿Un café mientras esperamos? ☕</Center>

      </Box>}
    {error && <Box>Error {error}!</Box>}
    {data && <Box>No hay data!</Box>}
  </Box>

}

export const loadingData = (load: boolean, error: number | boolean, data: boolean) : boolean => {
  if(load || error || data){
    return true
  }
  return false
}

export default LoadStatus