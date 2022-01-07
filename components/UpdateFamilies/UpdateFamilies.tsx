import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { Family } from "../../pages/dashboard"
import { useAddFamilyMutation, useDeleteFamilyMutation } from '../../redux/services/christmasList'

interface UpdateFamilyProps {
    families?: Family[]
}

export const UpdateFamilies = ({ families }: UpdateFamilyProps) => {
    const [addFamily, { isLoading: addingFamily, error: addFamilyError }] = useAddFamilyMutation()
    const [deleteFamily] = useDeleteFamilyMutation()
    const [passcode, setPasscode] = useState('')

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (passcode !== '') {
            addFamily(passcode)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPasscode(event.target.value)
    }
    return (
        <Box borderWidth='2px' p='20px' borderRadius='10px'>
            <Heading as='h4' size='sm'>Join a Family</Heading>
            <Text fontSize='12px'>Enter the passcode of a family you want to join below.</Text>
            <Flex my='5px'>
                <Input onChange={handleChange} value={passcode} placeholder='Family passcode...'/>
                <Button ml='10px' onClick={handleSubmit} isLoading={addingFamily}>Join</Button>
            </Flex>
            <Heading mt='10px' as='h4' size='sm'>Current Families</Heading>
            <Text fontSize='12px'>You are currently a member of the following families.</Text>
            { addFamilyError && <Text fontSize='10px' textColor='red'>Uh oh. There was an error trying to add this family!</Text>}
            {families?.map((family) => {
                return(
                    <Flex px='20px' align='center' justify='space-between' w='100%' h='35px'>
                        {family.name}
                        <DeleteIcon onClick={() => deleteFamily(family._id)}/>
                    </Flex>
                )
            })}
        </Box>
    )
}