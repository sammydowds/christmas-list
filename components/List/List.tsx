import { Box, VStack, Heading, Flex, Text, Input } from '@chakra-ui/react'
import { useAddPresentMutation } from "../../redux/services/christmasList"
import React, { useState } from 'react'
import { Present } from '../../pages/dashboard'
import { OwnWishlistItem } from './OwnWishlistItem'
import { WishlistItem } from './WishlistItem'
import { ShoppingListItem } from './ShoppingListItem'

export enum ListType {
  SHOPPING = 'shopping', 
  OWN_WISHLIST = 'own_wishlist',
  WISHLIST = 'wishlist'
}

interface ListItemProps {
  present: Present,
  typeOfList: ListType
}
const ListItem = ({present, typeOfList}: ListItemProps) => {
  if (typeOfList === ListType.WISHLIST) {
    return <WishlistItem present={present} />
  } else if (typeOfList === ListType.SHOPPING) {
    return <ShoppingListItem present={present} />
  } else if (typeOfList === ListType.OWN_WISHLIST) {
    return <OwnWishlistItem present={present} />
  }
  return <div></div>
}

const EmptyList = () => {
  return (
    <Flex w='100%' p='20px' direction='column' justify='center' align='center' borderWidth='2px' borderRadius='10px'>
        <Text>No Presents</Text>
    </Flex>
  )
}

interface ListItemsProps {
  presents: Present[],
  typeOfList: ListType,
}
export const ListItems = ({ presents, typeOfList }: ListItemsProps) => {
  return (
    <>
      {presents?.map((present: Present) => {
        return (
            <ListItem key={`${present._id}-${typeOfList}`} present={present} typeOfList={typeOfList} />
          )
        })
      }
    </>
  )
}

export interface ListProps {
  presents?: Present[]
  title?: string
  isEditable?: boolean
  typeOfList: ListType
}
export const List = ({ presents, title, typeOfList }: ListProps) => {
  return (
    <Box pt='15px' pb='25px' px='20px' w='100%' bgColor='#E0C9A625' borderRadius={10} textAlign='center'>
      <VStack spacing='10px'>
        <Heading as='h4' size='lg' >{title}</Heading>
        {presents?.length ? <ListItems presents={presents} typeOfList={typeOfList} /> : <EmptyList />}
      </VStack>
    </Box>
  )
}
