import { Box, Heading, Text, Stack } from '@chakra-ui/react'

const Privacy = () => {
  return (<>
    <Box>

      <Heading as="h2" size="lg">
        Aviso de privacidad
      </Heading>

      <Stack spacing={3}>

        <Box>
          <Heading as="h4" size="md">
            Información utilizada
          </Heading>
          <Text>
            La información personal utilizada se solicita únicamente para ofrecer un servicio que la necesite, siempre informando al usuario y solicitando su autorización.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            Protección
          </Heading>
          <Text>
            Se utilizarán todos los recursos a nuestro alcance para asegurar la integridad y protección de los datos tanto de perdida como de robo.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            Terceros
          </Heading>
          <Text>
            No se comparte ninguna información personal con ningún tercero, excepto cuando sea requerido por la ley.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            Cookies
          </Heading>
          <Text>
            Es posible que se utilicen distintas cookies para ofrecer servicios.
            Un ejemplo de las cookies utilizadas es la de 'session' la cual es utilizada para autentificar al usuario.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            Modificaciones
          </Heading>
          <Text>
            Se reserva el derecho de efectuar cambios al aviso de privacidad cuando se considere necesario. 
            Los cambios serán informados a través de la página web. 
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            Aceptación
          </Heading>
          <Text>
            Si el usuario utiliza los servicios ofrecidos por el sitio, se asume que ha leído, entendido y aceptado los términos anteriores. Si el usuario no está de acuerdo con los
            terminos no deberá de utilizar los servicios ofrecidos ni proporcionar información alguna. 
          </Text>
        </Box>

        <Box>
          Última actualización 4 de enero de 2021
        </Box>


      </Stack>
    </Box>
  </>)
}

export default Privacy