import { CreateAccountForm } from "../components/CreateAccountForm"
import { Flex } from '@chakra-ui/react'
import { CreateAccountAndFamilyForm } from "../components/CreateAccountAndFamilyForm"

const Account = () => {
    return(
        <Flex direction='column' justify='space-around' minH='100vh' align='center'>
            <CreateAccountAndFamilyForm />
            <h4>OR</h4>
            <CreateAccountForm />
        </Flex>
    )
}

export default Account