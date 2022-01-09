import { Flex } from '@chakra-ui/react'
import { CreateAccountAndFamilyForm } from "../components/CreateAccountAndFamilyForm"

const Account = () => {
    return(
        <Flex bgColor='#E0C9A625' p='20px' direction='column' justify='space-around' h='100vh' align='center'>
            <CreateAccountAndFamilyForm />
        </Flex>
    )
}

export default Account