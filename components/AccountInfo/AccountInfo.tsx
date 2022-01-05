import Image from 'next/image'
import { Box, VStack, Text, Flex, Heading, ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react'

const ImpishStatus = () => {
  return(
    <Text color='red'>
    IMPISH
    <Image 
      src='/images/impish.svg'
      height={20}
      width={20}
    />
    </Text>
  )
}

const AdmirableStatus = () => {
  return(
    <Text textAlign='center' color='green'>
      ADMIRABLE
      <Image 
        src='/images/sm-santa.svg'
        height={20}
        width={20}
      />
    </Text>
  )
}

interface AccountInfoProps {
  email?: string
  name?: string
  isImpish?: boolean
  onClickDeleteAccount?: () => void
  onClickLogout?: () => void
}

export const AccountInfo = ({ name, isImpish, email, onClickDeleteAccount, onClickLogout }: AccountInfoProps) => {
  return(
    <Box maxW='300px'>
      <VStack>
        <Text as='i' color='grey' display='flex'>Connected to Northpole Servers:&nbsp; <Image src={'/images/check-circle.svg'} height={20} width={20} /></Text>
        <Box borderWidth='2px' p='10px' borderRadius='10px'>
          <Flex display='column'>
            <Heading as='h4' size='sm'>Profile</Heading>
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text display='flex'>Status:&nbsp; {isImpish ? <ImpishStatus /> : <AdmirableStatus />}</Text>
            <ButtonGroup mt='5px'>
              <Button onClick={onClickDeleteAccount} colorScheme='red'>Delete Account</Button>
              <Button onClick={onClickLogout} colorScheme='blue'>Logout</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </VStack>
    </Box>
  )
}
