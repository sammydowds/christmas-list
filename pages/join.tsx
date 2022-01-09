import { CreateAccountForm } from "../components/CreateAccountForm"
import { Flex } from '@chakra-ui/react'

const Account = () => {
    return(
        <Flex bgColor='#E0C9A625' p='20px' direction='column' justify='space-around' h='100vh' align='center'>
            <CreateAccountForm />
        </Flex>
    )
}

export default Account