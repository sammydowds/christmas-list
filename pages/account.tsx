import { CreateAccountForm } from "../components/CreateAccountForm"
import { Flex, Heading } from '@chakra-ui/react'
import { CreateAccountAndFamilyForm } from "../components/CreateAccountAndFamilyForm"

const Account = () => {
    return(
        <Flex p='20px' direction='column' justify='space-around' minH='100vh' align='center'>
            <CreateAccountAndFamilyForm />
            <Heading m='20px'>OR</Heading>
            <CreateAccountForm />
        </Flex>
    )
}

export default Account