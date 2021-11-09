import {Box} from "@chakra-ui/react"

type partType = {
  type: number
  text: string
}

const ParsedInput = ({text}: {text: string}) => {
  let parsedText = text
  let newText : partType[] = []

  while(parsedText.includes("{}")){
    let index = parsedText.indexOf("{}")
    newText = [...newText, {
      type: 0,
      text: parsedText.substring(0, index)
    }, 
    {
      type: 1,
      text: ""
    }]
    parsedText = parsedText.slice(index+2, parsedText.length)
  }
 
  return <Box class="css-1nyw6qf chakra-input">
    {newText.map((part, index) => {
      if(part.type === 0){
        return part.text
      }
      if(part.type === 1){
        return <b>User</b>
      }else return ""
    })}
  </Box>
}

export default ParsedInput
