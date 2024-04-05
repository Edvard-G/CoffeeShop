import { Alert, AlertProps } from "@mui/material"
import { ReactNode } from "react"

interface CartAlertProps extends AlertProps {
    children: ReactNode;
}

const Message: React.FC<CartAlertProps> = ({children, ...rest}) => {
  return (
    <Alert variant="filled" severity="info" {...rest}>
        {children}
    </Alert>
  )
}

export default Message