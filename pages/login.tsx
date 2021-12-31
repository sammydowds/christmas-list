
/**@jsxImportSource @emotion/react */
import { LoginForm } from "../components/LoginForm"
import { Heading, Flex } from '@chakra-ui/react'

const Login = () => {
    return(
      <Flex direction='column' justify='space-around' align='center' minH='100vh' spacing={10}>
	<LoginForm loading/>
      </Flex>
    )
}

export default Login
