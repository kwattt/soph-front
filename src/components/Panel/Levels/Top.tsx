import { 
  Box,
  Heading,
  Text,
  Kbd,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

import useApi from "./../API"
import { loadingData, LoadStatus } from "./../Other"

const Top = () => {
  const {data, loading, error} = useApi("/stats/top")

  if(loadingData(loading, error, !data)){
    return <LoadStatus load={loading} error={error} data={!data}/>
  }

  const newData: LevelUser[] = data

  return <>
    <Box textAlign="center">
      <Heading>Top</Heading>
      <Text>Top de usuarios con mas nivel en el servidor. <Kbd>/top</Kbd></Text>
    </Box>

    <Box maxH="250px" my="3" overflowY="auto">
      {newData.length === 0 ?
        <Heading size="sm" as="h5" textAlign="center">No hay usuarios :(</Heading>
      : 
        <Table>
          <TableCaption>Top de usuarios con mas nivel en el servidor.</TableCaption>
          <Thead>
            <Tr>
              <Th>Usuario</Th>
              <Th>Nivel</Th>
              <Th>Experiencia</Th>
              <Th>Puntos</Th>
            </Tr>
          </Thead>
          <Tbody>
          {newData.map((level, index) => {
            return <Tr key={'lvl' + index}>
              <Td>{level.name}</Td>
              <Td>{level.level}</Td>
              <Td>{level.xp}</Td>
              <Td>{level.points}</Td>
              </Tr>
          })}
          </Tbody>
        </Table>
      }

    </Box>
  </>
}

export default Top