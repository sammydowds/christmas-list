import { Box, Button, VStack, FormLabel, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import Router from 'next/router'
import { useLoginMutation } from '../../redux/services/christmasList'
import Image from 'next/image'

export const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: ''})
  const [login, { isLoading, error }] = useLoginMutation()
  
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await login(formState).unwrap().then(() => Router.push('/dashboard'))
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
	  <FormControl isRequired>
	    <FormLabel htmlFor='email'>Email</FormLabel>
	    <Input onChange={handleChange} name="email" variant='flushed' focusBorderColor='green.400' size='lg' type='email' placeholder='Email' /> 
	  </FormControl>
	  <FormControl isRequired>
	    <FormLabel htmlFor='password'>Password</FormLabel>
	    <Input onChange={handleChange} name="password" variant='flushed' focusBorderColor='green.400' size='lg' type='password' placeholder='Enter password' />
	  </FormControl>
	  <Button type="submit" isLoading={isLoading} isFullWidth size='md' colorScheme="green">Login</Button>
	  {error && <Box maxW='250px' height='50px'>
	    {error && error?.data?.error}
	  </Box>}
	</VStack>
      </form>
    </Box>
  )
}
