import { extendTheme, ThemeConfig, theme as ctheme } from "@chakra-ui/react"

const config : ThemeConfig = {
  initialColorMode: "dark",
}

const theme = extendTheme({ 
  config,
  components: {
    ParsedInput: {
      ...ctheme.components.Input,
    },
    ParsedArea: {
      ...ctheme.components.Textarea,
    }
  }
})

export default theme