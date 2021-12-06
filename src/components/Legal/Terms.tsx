import { Box, Heading, Text, Stack, Link } from '@chakra-ui/react'

const Terms = () => {
  return (<>

    <Box
    >

      <Heading as="h2" size="lg">
        Terminos de uso
      </Heading>

      <Stack spacing={3}>

        <Box>
          <Heading as="h4" size="md">
            1. Terminos
          </Heading>
          <Text>
            Al acceder al sitio <Link href="https://sophii.kv-at.com/" isExternal>https://sophii.kv-at.com/</Link> aceptas todos los terminos especificados a continuación, también aceptas que eres responsable 
            de cumplir las leyes locales aplicables. Si no estás de acuerdo con alguno de estos terminos, no deberás de utilizar ningún servicio o acceder al sitio. 
            Es posible que en el sitio exista material protegido por derecho de autor.
          </Text>
        </Box>
        
        <Box>
          <Heading as="h4" size="md">
            2. Actualizaciones
          </Heading>
          <Text>
            Se reserva el derecho de efectuar cambios al aviso de privacidad cuando se considere necesario. 
            Los cambios serán informados a través de la página web. 
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            3. Urls externos
          </Heading>
          <Text>
            Es posible que haya urls externos a servicios de terceros y no se toma ninguna responsabilidad del contenido, politicas de privacidad, practicas de 
            los servicios de estos y eventos resultantes de estos urls externos.
            Se recomienda leer los terminos de servicio y aviso de privacidad de cualquier sitio que visites.
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            4. Prohibición
          </Heading>
          <Text>
            Se reserva el derecho de prohibir la utilización de los servicios ofrecidos. 
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            5. Discord
          </Heading>
          <Text>
            Al utilizar los servicios ofrecidos, aceptas los terminos mencionados anteriormente y adicionalmente aceptas las{" "} 
            <Link href="https://discord.com/terms" isExternal>Condiciones del servicio de Discord</Link>,{" "} 
            <Link href="https://discord.com/developers/docs/legal" isExternal>Terminos de uso de la API de Discord</Link>{" "}  
            y las <Link href="https://discord.com/guidelines" isExternal>Directivas de la comunidad de Discord</Link>
          </Text>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            6. Aceptación
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

export default Terms