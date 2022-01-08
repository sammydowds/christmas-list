
import { DeleteIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, Text, useClipboard } from "@chakra-ui/react"
import { Family } from "../../../pages/dashboard"
import { useDeleteFamilyMutation } from "../../../redux/services/christmasList"

interface FamilyProps {
    family: Family,
    deletingFamily: boolean,
    onDelete: (id: string) => void
}
const Family = ({ family, deletingFamily, onDelete}: FamilyProps) => {
    const { hasCopied, onCopy } = useClipboard(family.passcode)
    return (
        <>
        <Flex px='20px' align='center' justify='space-between' w='100%' h='35px'>
            {family.name}
            <Text fontSize='14px' color='grey' decoration='underline' onClick={onCopy}>{hasCopied ? 'copied!' : 'copy passcode'}</Text>
            <div>
                <DeleteIcon color={deletingFamily ? 'grey' : undefined} onClick={() => onDelete(family._id)} cursor='pointer'/>
            </div>
        </Flex>
    </>
    )
}

interface DeleteFamilySectionProps {
    families?: Family[],
}
export const DeleteFamilySection = ({ families }: DeleteFamilySectionProps) => {
    const [deleteFamily, { isLoading: deletingFamily, error: deleteFamilyError }] = useDeleteFamilyMutation()
    return (
        <>
            <Heading mt='10px' as='h4' size='sm'>Current Families</Heading>
            <Text fontSize='12px'>You are currently a member of the following families.</Text>
            <Box>
                {deleteFamilyError && 
                    <Flex px='20px' align='center' justify='space-between' w='100%'>
                        <WarningTwoIcon color='red' />
                        {/*
                        // @ts-ignore */}
                        <Text fontSize='10px' textColor='red'>{deleteFamilyError.data.error}</Text>
                    </Flex>
                }
            </Box>
            {families?.map((family) => {
                return(
                    <Family family={family} onDelete={deleteFamily} deletingFamily={deletingFamily} />                  
                )
            })}
        </>
    )
}