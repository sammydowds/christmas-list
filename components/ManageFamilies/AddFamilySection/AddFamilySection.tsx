import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useAddFamilyMutation } from '../../../redux/services/christmasList'

export const AddFamilySection = () => {
    const [addFamily, { isLoading: addingFamily, error: addFamilyError }] = useAddFamilyMutation()
    const [passcode, setPasscode] = useState('')

    const handlePasscodeSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (passcode !== '') {
            addFamily(passcode)
            setPasscode('')
        }
    }

    const handlePasscodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPasscode(event.target.value)
    }
    
    return (
        <>
            <Heading as='h4' size='sm'>Join a Family</Heading>
            <Text fontSize='12px'>Enter the passcode of a family you want to join below.</Text>
            <Flex my='5px'>
                <Input onChange={handlePasscodeChange} value={passcode} placeholder='Family passcode...'/>
                <Button ml='10px' onClick={handlePasscodeSubmit} isLoading={addingFamily}>Join</Button>
            </Flex>
            { addFamilyError && <Text fontSize='10px' textColor='red'>Uh oh. There was an error trying to add this family!</Text>}
        </>
    )

}