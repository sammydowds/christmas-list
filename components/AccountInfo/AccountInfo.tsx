import Image from 'next/image'
import { Box, VStack, Text, Input, Flex, Circle, Heading, ButtonGroup, Button, useClipboard } from '@chakra-ui/react'
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
      ADMIREABLE
      <Image 
        src='/images/sm-santa.svg'
        height={20}
        width={20}
      />
    </Text>
  )
}

interface ProfileProps {
  email: string
  isImpish?: boolean
  onClickDeleteAccount?: () => void
  onClickLogout?: () => void
}
const Profile = ({ email, isImpish, onClickDeleteAccount, onClickLogout }: ProfileProps) => {
  return (
    <Box borderWidth='2px' p='10px' borderRadius='10px'>
      <Flex display='column'>
        <Heading as='h4' size='sm'>Profile</Heading>
        <Text>Email: {email}</Text>
        <Text display='flex'>Status:&nbsp; {isImpish ? <ImpishStatus /> : <AdmirableStatus />}</Text>
        <ButtonGroup mt='5px'>
          <Button onClick={onClickDeleteAccount} colorScheme='red'>Delete Account</Button>
          <Button onClick={onClickLogout} colorScheme='blue'>Logout</Button>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}

interface FamilyProps {
  passcode: string
}
const Family = ({ passcode }: FamilyProps) => {
  const { hasCopied, onCopy } = useClipboard(passcode)
  return (
    <Box borderWidth='2px' p='10px' borderRadius='10px'>
      <Flex display='column'>
        <Heading as='h4' size='sm'>Family</Heading>
        <Text noOfLines={3} fontSize='10px'>Share this code with family members. They will enter this code when they sign up to join the family!</Text>
        <Flex mt='5px'>
          <Input isReadOnly value={passcode} />
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

interface AccountInfoProps extends ProfileProps, FamilyProps {}

export const AccountInfo = ({ isImpish, email, passcode, onClickDeleteAccount, onClickLogout }: AccountInfoProps) => {
  return(
    <Box maxW='300px'>
      <VStack>
        <Text as='i' color='grey' display='flex'>Connected to Northpole Servers:&nbsp; <Image src={'/images/check-circle.svg'} height={20} width={20} /></Text>
        <Profile onClickLogout={onClickLogout} onClickDeleteAccount={onClickDeleteAccount} email={email} isImpish={isImpish} />
        <Family passcode={passcode} />
      </VStack>
    </Box>
  )
}
