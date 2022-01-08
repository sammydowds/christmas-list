import { Box, Heading, Input, VStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Family, Present } from "../../pages/dashboard"
import { AddPresentRequest, useAddPresentMutation } from "../../redux/services/christmasList"
import { ListType, ListItems } from "../List"

interface AddPresent {
    familyId: string
}
const AddPresent = ({ familyId }: AddPresent) => {
    const [addPresent, { isLoading: isAdding, error: addError }] = useAddPresentMutation()
    const [presentDescription, setPresentDescription] = useState('')

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const payload: AddPresentRequest = { description: presentDescription, familyId }
        presentDescription !== '' && await addPresent(payload)
        setPresentDescription('')
        return
    }

    const handleChange = ({
        target: name,
        }: React.ChangeEvent<HTMLInputElement>) => 
        setPresentDescription(name.value)

    return(
        <Input
            w='100%'
            h='35px'
            display='flex'
            variant='flushed'
            justifyContent='space-between'
            textAlign='center'
            colorScheme='green'
            value={presentDescription}
            placeholder={'Add a present'}
            onBlur={handleSubmit}
            onChange={handleChange}
            fontColor='gray'
            name='description'
        />
    )
}

const AddFamilyCTA = () => {
    return (
        <Box p='15px' borderRadius={10} textAlign='center'>
            Please join a family to start your wishlist.
        </Box>
    )
}

interface OwnWishlistProps {
    wishlist?: Present[]
    families?: Family[]
}
export const OwnWishlist = ({ wishlist, families }: OwnWishlistProps) => {
    if (!wishlist) {
        return null
    }

    return (
        <Box pt='15px' pb='25px' px='20px' minW='300px' bgColor='#E0C9A625' borderRadius={10} textAlign='center'>
            <VStack spacing='10px'>
                <Heading as='h4' size='sm'>Your Wishlists</Heading>
                {
                    families?.map((family) => {
                        const presents = wishlist.filter((present) => {
                            return family._id === present.familyId
                        })
                        return (
                            <>
                                <Box w='100%' py='5px'>
                                    <Text as='i' fontSize='16px' fontWeight='bold'>{family.name} Family</Text>
                                    <ListItems typeOfList={ListType.OWN_WISHLIST} presents={presents} />
                                </Box>
                                <AddPresent familyId={family._id} />
                            </>
                        )
                    })
                }
                {!families?.length && <AddFamilyCTA />}
            </VStack>
        </Box>
    )
}