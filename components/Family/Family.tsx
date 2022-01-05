import { Box, Flex, Heading, useClipboard, Text, Input, Button } from "@chakra-ui/react"

export interface FamilyProps {
    passcode: string,
    name: string
}
export const Family = ({ name, passcode }: FamilyProps) => {
const { hasCopied, onCopy } = useClipboard(passcode)
return (
    <Box borderWidth='2px' p='10px' borderRadius='10px'>
    <Flex display='column'>
        <Heading as='h4' size='sm'>Family</Heading>
        <Text>Name: {name}</Text>
        <Text noOfLines={3} fontSize='10px'>Share this code with family members. They will enter this code when they sign up to join the family!</Text>
        <Flex mt='5px'>
        <Input isReadOnly value={passcode} />
        <Button onClick={onCopy} ml={2}>
            {hasCopied ? 'Copied' : 'Copy'}
        </Button>
        </Flex>
    </Flex>
    </Box>
)
}