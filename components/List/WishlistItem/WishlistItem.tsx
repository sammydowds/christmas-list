import Image from 'next/image'
import { Flex, Badge, Text } from '@chakra-ui/react'
import { useClaimPresentMutation, useUnclaimPresentMutation } from "../../../redux/services/christmasList"
import React from 'react'
import { Present } from '../../../pages/dashboard'

interface WishlistItemProps {
    present: Present
  }
export const WishlistItem = ({ present }: WishlistItemProps) => {
    const [claimPresent, { isLoading: isClaiming, error: claimError }] = useClaimPresentMutation()
    const [unclaimPresent, { isLoading: isUnclaiming, error: unclaimError }] = useUnclaimPresentMutation()

    const handleClick = async () => {
        if (!present.from) {
        await claimPresent(present._id)
        return
        } else {
        await unclaimPresent(present._id)
        return
        }
    }
    return (
        <Flex onClick={handleClick} align='center' justify='center' w='100%' h='35px' borderBottom='1px'>
        <Text as={present.from ? 's' : 'span'} color={present.from ? 'grey' : 'black'}>{present.description}</Text>
        {present.from && <>
            <Badge mx='5px' colorScheme='green'>{present.from}</Badge>
            <Image src='/images/sm-santa.svg' height='15px' width='15px' />
        </>}
        </Flex>
    )
}