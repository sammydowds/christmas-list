/**@jsxImportSource @emotion/react */
import * as styles from './styles'
import Image from 'next/image'
import { Box, VStack, Heading, Flex, Badge, Text } from '@chakra-ui/react'

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

interface ListItemProps {
  present: Present,
  listType: ListType
}
const ListItem = ({present, listType}: ListItemProps) => {
  // set state here as the present? each item manages present state
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
    return (
      <input css={styles.yourPresent} value={present.description} onChange={onChange}/>
   )
  }
  return <div></div>
}

export interface ListProps {
  presents?: Present[]
  title?: string
  isEditable?: boolean
  listType: ListType
}
export const List = ({ presents, title, listType }: ListProps) => {
  return (
    <Box pt='15px' pb='25px' px='20px' minW='300px' bgColor='#E0C9A625' borderRadius={10} textAlign='center'>
      <VStack spacing='10px'>
        <Heading as='h4' size='md' >{title}</Heading>
        {presents?.map((present: Present) => {
          return (
              <ListItem key={`${present.id}-${listType}`} present={present} listType={listType} />
            )
          })
        }
      </VStack>
    </Box>
  )
}
