import Image from 'next/image'
import { Flex, Badge, Text } from '@chakra-ui/react'
import { useBuyPresentMutation, useUnbuyPresentMutation } from "../../../redux/services/christmasList"
import React from 'react'
import { Present } from '../../../pages/dashboard'

interface ShoppingListItemProps {
    present: Present
  }
export const ShoppingListItem = ({ present }: ShoppingListItemProps) => {
    const [buyPresent, { isLoading: isBuying, error: buyError }] = useBuyPresentMutation()
    const [unbuyPresent, { isLoading: isUnbuying, error: unbuyError }] = useUnbuyPresentMutation()

    const handleClick = async () => {
        if (present.isBought) {
        await unbuyPresent(present._id)
        return
        }
        await buyPresent(present._id)
        return
    }

    return (
        <Flex align='center' justify='center' w='100%' h='35px' borderBottom='1px' onClick={handleClick}>
        <Text as={present.isBought ? 's' : 'span'} color={present.isBought ? 'grey' : 'black'}>{present.description} for {present.to}</Text>
        {present.isBought && <>
            <Badge mx='5px' colorScheme='green'>Bought</Badge>
            <Image src='/images/sm-santa.svg' height='15px' width='15px' />
        </>}
        </Flex>
    )
}