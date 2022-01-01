import { CreateAccountForm } from "../components/CreateAccountForm"
import { Flex } from '@chakra-ui/react'

const Account = () => {
    return(
        <Flex direction='column' justify='space-around' minH='100vh' align='center'>
            <CreateAccountForm />
        </Flex>
    )
}

export default Account