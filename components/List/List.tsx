import Image from 'next/image'
import { Box, VStack, Heading, Flex, Badge, Text, Editable, EditableInput, EditablePreview, useEditableControls, ButtonGroup, IconButton, Input } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useClaimPresentMutation, useUnclaimPresentMutation, useBuyPresentMutation, useUnbuyPresentMutation, useAddPresentMutation, useDeletePresentMutation } from "../../redux/services/christmasList"
import React, { useState } from 'react'


export enum ListType {
  SHOPPING = 'shopping', 
  OWN_WISHLIST = 'own_wishlist',
  WISHLIST = 'wishlist'
}

export interface Present {
  description: string, 
  to: string
  from: string | null
  isBought: boolean
  _id: string
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

interface WishlistItemProps {
  present: Present
}
const WishlistItem = ({ present }: WishlistItemProps) => {
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

interface OwnWishlistItemProps {
  present: Present
}
const OwnWishlistItem = ({ present }: OwnWishlistItemProps) => {
  const [deletePresent, { isLoading: isDeleting, error: deletingError }] = useDeletePresentMutation()

  const handleDelete = async () => {
    await deletePresent(present._id)
  }

  return (
    <Flex align='center' justify='space-between' w='100%' h='35px' borderBottom='1px'>
      <Text as={present.from ? 's' : 'span'} color={present.from ? 'grey' : 'black'}>{present.description}</Text>
      <IconButton aria-label='delete present' size='sm' onClick={handleDelete} icon={<DeleteIcon />} />
    </Flex>
  )
}

interface ShoppingListItemProps {
  present: Present
}
const ShoppingListItem = ({ present }: ShoppingListItemProps) => {
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

interface ListItemProps {
  present: Present,
  listType: ListType
}
const ListItem = ({present, listType}: ListItemProps) => {
  if (listType === ListType.WISHLIST) {
    return <WishlistItem present={present} />
  } else if (listType === ListType.SHOPPING) {
    return <ShoppingListItem present={present} />
  } else if (listType === ListType.OWN_WISHLIST) {
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
  listType: ListType,
}
const ListItems = ({ presents, listType}: ListItemsProps) => {
  return (
    <>
      {presents?.map((present: Present) => {
        return (
            <ListItem key={`${present._id}-${listType}`} present={present} listType={listType} />
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
  listType: ListType
}
export const List = ({ presents, title, listType }: ListProps) => {
  // TODO: add cbs for deleting, editing, and creating presents
  return (
    <Box pt='15px' pb='25px' px='20px' minW='300px' bgColor='#E0C9A625' borderRadius={10} textAlign='center'>
      <VStack spacing='10px'>
        <Heading as='h4' size='m' >{title}</Heading>
        {presents?.length ? <ListItems presents={presents} listType={listType} /> : <EmptyList />}
        {listType === ListType.OWN_WISHLIST && <AddPresent /> }
      </VStack>
    </Box>
  )
}
