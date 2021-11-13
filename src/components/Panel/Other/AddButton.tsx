import {Button, ButtonProps} from "@chakra-ui/react"

interface AddButtonProps extends ButtonProps {
  limit: number
  currentl: number
}

const AddButton = (props : AddButtonProps) => {
  if(props.currentl >= props.limit) 
    return <Button
      my="2"
      color="red.400" 
      size="sm" 
      borderRadius="0"
      {...props}
      disabled={true}
    >
      Máximo alcanzado
    </Button>

  return <Button
      my="2"
      color="green.400" 
      size="sm" 
      borderRadius="0"
      {...props}
  >
      Nuevo
    </Button>
}

export default AddButton