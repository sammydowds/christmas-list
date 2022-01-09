import Image from 'next/image'
import { Box, VStack, Text, Flex, Heading, ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react'
import { useLogoutMutation } from '../../redux/services/christmasList'
import Router from "next/router"

const ImpishStatus = () => {
  return(
    <Text display='inline' color='red'>
    IMPISH
    <Image 
      src='/images/impish.svg'
      height={12}
      width={12}
    />
    </Text>
  )
}

const AdmirableStatus = () => {
  return(
    <Text display='inline' textAlign='center' color='green'>
      ADMIRABLE
      <Image 
        src='/images/sm-santa.svg'
        height={12}
        width={12}
      />
    </Text>
  )
}

interface AccountInfoProps {
  email?: string
  name?: string
  isImpish?: boolean
}

export const AccountInfo = ({ name, isImpish, email }: AccountInfoProps) => {
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
      logout()
      Router.push('/login')
  }
  const message = `Welcome ${name} (${email}). Your current status according to Santa's list is`
  return(
    <Box w='100%'>
      <VStack>
        <Text as='i' color='grey' display='flex'>Connected to Northpole Servers:&nbsp; <Image src={'/images/check-circle.svg'} height={20} width={20} /></Text>
        <Box w='100%' borderWidth='2px' p='10px' borderRadius='10px'>
          <Flex display='column'>
            <Heading as='h4' size='sm'>Profile</Heading>
            <Text fontSize='12px' as='span'>
              {message}&nbsp;
              {isImpish ? <ImpishStatus /> : <AdmirableStatus />}
            </Text>
            <ButtonGroup mt='5px' w='100%' justifyContent='flex-end'>
              <Button size='sm' onClick={handleLogout} colorScheme='blue'>Logout</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </VStack>
    </Box>
  )
}
