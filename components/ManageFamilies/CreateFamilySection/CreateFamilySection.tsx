import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useCreateFamilyMutation } from '../../../redux/services/christmasList'

export const CreateFamilySection = () => {
    const [createFamily, { isLoading: creatingFamily, error: createFamilyError }] = useCreateFamilyMutation()
    const [familyName, setFamilyName] = useState('')

    const handleFamilyNameSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (familyName !== '') {
            createFamily(familyName)
            setFamilyName('')
        }
    }

    const handleFamilyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFamilyName(event.target.value)
    }
    return (
        <>
            <Heading as='h4' size='sm'>Create a Family</Heading>
            <Text fontSize='12px'>Enter the name of the family you want to create.</Text>
            <Flex my='5px'>
                <Input onChange={handleFamilyNameChange} value={familyName} placeholder='Family name...'/>
                <Button ml='10px' onClick={handleFamilyNameSubmit} isLoading={creatingFamily}>Create</Button>
            </Flex>
            { createFamilyError && <Text fontSize='10px' textColor='red'>Uh oh. There was an error trying to create this family!</Text>}
        </>
    )

}