import Image from 'next/image'
import { Box, VStack, Heading, Flex, Badge, Text, Editable, EditableInput, EditablePreview, useEditableControls, ButtonGroup, IconButton } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'

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
  id: string
}

export interface EditablePresentProps {
  present: Present
}

const EditablePresent = ({ present }: EditablePresentProps) => {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup ml='5px' size='sm'>
        <IconButton colorScheme='green' aria-label='confirm change' icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton colorScheme='red' aria-label='cancel change' icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex ml='5px'>
        <IconButton mr='10px' aria-label='edit present' size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        <IconButton aria-label='delete present' size='sm' icon={<DeleteIcon />} />
      </Flex>
    )
  }
  return(
    <Editable 
        w='100%'
        h='35px'
        display='flex'
        justifyContent='space-between'
        borderBottom='1px'
        textAlign='center'
        defaultValue={present.description}
        isPreviewFocusable={false}
      >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  )
}

interface ListItemProps {
  present: Present,
  listType: ListType
}
const ListItem = ({present, listType}: ListItemProps) => {
  // TODO: implement delete present, update present, and click present
  const onChange = () => console.log('Some change')
  if (listType === ListType.WISHLIST) {
    return (
      <Flex align='center' justify='center' w='100%' h='35px' borderBottom='1px'>
        <Text as={present.from ? 's' : 'span'} color={present.from ? 'grey' : 'black'}>{present.description}</Text>
        {present.from && <>
          <Badge mx='5px' colorScheme='green'>{present.from}</Badge>
          <Image src='/images/sm-santa.svg' height='15px' width='15px' />
        </>}
      </Flex>
    )
  } else if (listType === ListType.SHOPPING) {
    return (
      <Flex align='center' justify='center' w='100%' h='35px' borderBottom='1px'>
        <Text as={present.from ? 's' : 'span'} color={present.from ? 'grey' : 'black'}>{present.description}</Text>
        {present.from && <>
          <Badge mx='5px' colorScheme='green'>Bought</Badge>
          <Image src='/images/sm-santa.svg' height='15px' width='15px' />
        </>}
      </Flex>
    )
  } else if (listType === ListType.OWN_WISHLIST) {
    return <EditablePresent present={present} />
  }
  return <div></div>
}

const EmptyList = () => {
  return (
    <Flex w='100%' p='20px' direction='column' justify='center' align='center' borderWidth='2px' borderRadius='10px'>
        <Text>No Items</Text>
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
            <ListItem key={`${present.id}-${listType}`} present={present} listType={listType} />
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
  // TODO: add empty state and loading state
  return (
    <Box pt='15px' pb='25px' px='20px' minW='300px' bgColor='#E0C9A625' borderRadius={10} textAlign='center'>
      <VStack spacing='10px'>
        <Heading as='h4' size='m' >{title}</Heading>
        {presents?.length ? <ListItems presents={presents} listType={listType} /> : <EmptyList />}
      </VStack>
    </Box>
  )
}
