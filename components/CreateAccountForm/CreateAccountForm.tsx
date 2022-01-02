import { Box, Button, VStack, FormLabel, FormControl, Input, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import Router from 'next/router'
import { useCreateAccountMutation } from '../../redux/services/christmasList'
import Image from 'next/image'


// TODO: create second password field to make sure they match
export const CreateAccountForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '', passcode: ''})
  const [createAccount, { isLoading, error }] = useCreateAccountMutation()
  
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await createAccount(formState).unwrap().then(() => Router.push('/dashboard'))
  }

  const handleChange = ({
    target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => 
      setFormState((prev) => ({...prev, [name]: value }))
  
  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <form onSubmit={handleSubmit}>
	<VStack minW='300px' spacing='20px'>
	  <Image src='/images/sm-santa.svg' height={75} width={75} />
	  <Heading as='h4' size='sm'>Create an Account and Join Family!</Heading>
	  <FormControl isRequired>
	    <FormLabel htmlFor='email'>Email</FormLabel>
	    <Input onChange={handleChange} name="email" variant='flushed' focusBorderColor='green.400' size='lg' type='email' placeholder='Email' /> 
	  </FormControl>
	  <FormControl isRequired>
	    <FormLabel htmlFor='password'>Password</FormLabel>
	    <Input onChange={handleChange} name="password" variant='flushed' focusBorderColor='green.400' size='lg' type='password' placeholder='Enter password' />
	  </FormControl>
	  <FormControl isRequired>
	    <FormLabel htmlFor='passcode'>Enter the Family Passcode</FormLabel>
	    <Input onChange={handleChange} name="passcode" variant='flushed' focusBorderColor='green.400' size='lg' type='text' placeholder='Enter family passcode' />
	  </FormControl>
	  <Button type="submit" isLoading={isLoading} isFullWidth size='md' colorScheme="green">Create Account And Join Family</Button>
	  {error && <Box maxW='250px' height='50px'>
	    {/*
	    // @ts-ignore */}
	    {error && error?.data?.error}
	  </Box>}
	</VStack>
      </form>
    </Box>
  )
}
