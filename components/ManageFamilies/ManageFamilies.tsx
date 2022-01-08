import { DeleteIcon, SpinnerIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Input, Text, useClipboard } from "@chakra-ui/react"
import React, { useState } from "react"
import { Family } from "../../pages/dashboard"
import { useAddFamilyMutation, useCreateFamilyMutation, useDeleteFamilyMutation } from '../../redux/services/christmasList'


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

interface UpdateFamilyProps {
    families?: Family[]
}
export const ManageFamilies = ({ families }: UpdateFamilyProps) => {
    const [addFamily, { isLoading: addingFamily, error: addFamilyError }] = useAddFamilyMutation()
    const [deleteFamily, { isLoading: deletingFamily, error: deleteFamilyError }] = useDeleteFamilyMutation()
    const [createFamily, { isLoading: creatingFamily, error: createFamilyError }] = useCreateFamilyMutation()
    const [passcode, setPasscode] = useState('')
    const [familyName, setFamilyName] = useState('')

    const handlePasscodeSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (passcode !== '') {
            addFamily(passcode)
            setFamilyName('')
        }
    }

    const handleFamilyNameSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (familyName !== '') {
            createFamily(familyName)
            setPasscode('')
        }
    }

    const handlePasscodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPasscode(event.target.value)
    }

    const handleFamilyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFamilyName(event.target.value)
    }

    return (
        <Box borderWidth='2px' p='20px' borderRadius='10px'>
            <Heading as='h4' size='sm'>Join a Family</Heading>
            <Text fontSize='12px'>Enter the passcode of a family you want to join below.</Text>
            <Flex my='5px'>
                <Input onChange={handlePasscodeChange} value={passcode} placeholder='Family passcode...'/>
                <Button ml='10px' onClick={handlePasscodeSubmit} isLoading={addingFamily}>Join</Button>
            </Flex>
            { addFamilyError && <Text fontSize='10px' textColor='red'>Uh oh. There was an error trying to add this family!</Text>}
            <Heading as='h4' size='sm'>Create a Family</Heading>
            <Text fontSize='12px'>Enter the name of the family you want to create.</Text>
            <Flex my='5px'>
                <Input onChange={handleFamilyNameChange} value={familyName} placeholder='Family name...'/>
                <Button ml='10px' onClick={handleFamilyNameSubmit} isLoading={creatingFamily}>Create</Button>
            </Flex>
            { createFamilyError && <Text fontSize='10px' textColor='red'>Uh oh. There was an error trying to create this family!</Text>}
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
        </Box>
    )
}