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

const AddPresent = () => {
  const [addPresent, { isLoading: isAdding, error: addError }] = useAddPresentMutation()
  const [presentDescription, setPresentDescription] = useState('')

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    presentDescription !== '' && await addPresent(presentDescription)
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
const ListItems = ({ presents, typeOfList }: ListItemsProps) => {
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
    <Box pt='15px' pb='25px' px='20px' minW='300px' bgColor='#E0C9A625' borderRadius={10} textAlign='center'>
      <VStack spacing='10px'>
        <Heading as='h4' size='m' >{title}</Heading>
        {presents?.length ? <ListItems presents={presents} typeOfList={typeOfList} /> : <EmptyList />}
        {typeOfList === ListType.OWN_WISHLIST && <AddPresent /> }
      </VStack>
    </Box>
  )
}
