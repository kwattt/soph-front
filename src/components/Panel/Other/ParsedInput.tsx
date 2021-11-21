import {
  InputProps,
  Input,
  Box,
  useStyleConfig
} from "@chakra-ui/react"

import {useState} from "react"

interface ParsedInputProps extends InputProps {
  text: string
  noparse?: boolean
}

type parsedText = {
  type: number,
  text: string
}

const ParsedInput = (props: ParsedInputProps) => {
  const [inputState, setInputState] = useState(0)

  let parsedText = props.text
  let newText : parsedText[] = []

  const { 
    variant,
    size,
    colorScheme,
    orientation, 
    styleConfig,
    } = props

  const styles = useStyleConfig("ParsedInput", { 
    variant,
    size,
    colorScheme,
    orientation,
    styleConfig 
  })


  if(parsedText.includes("{}") && !props.noparse){
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
    if(parsedText)
      newText = [...newText, {
        type: 0,
        text: parsedText
      }]
  } else {
    newText = [{
      type: 0,
      text: parsedText
    }]
  }

  if(inputState === 1)
    return <>
      <Input 
        value={props.text} 
        autoFocus={true}
        onBlur={() => setInputState(0)}
        {...props}
      />
    </>

  const hacky : any = styles
  let myStyle = {}
  if(hacky.hasOwnProperty("field"))
    myStyle = {...myStyle, ...hacky.field}

  return <Box
  __css={myStyle}
  {...props}
    onClick={() => {
      setInputState(1)
    }}
    cursor="pointer"
    whiteSpace="nowrap"
  >
    {newText.map((val, id) => {
      return <Box key={id+"bpi"} display="inline-block">
        {val.type === 0 
          ? <>{val.text}</>
          : <b>&nbsp;User&nbsp;</b>
        }
      </Box>
    })}
  </Box>
}

export default ParsedInput