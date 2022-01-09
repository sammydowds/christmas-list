import { Box, Button, VStack, FormLabel, FormControl, Input, Heading, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import Router from 'next/router'
import { useLoginMutation } from '../../redux/services/christmasList'
import Link from 'next/link'

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
    <Box p={8} maxWidth="500px">
      <form onSubmit={handleSubmit}>
		<VStack minW='300px' spacing='20px'>
		<Heading as='h4' size='sm'>Please log in!</Heading>
		<FormControl isRequired>
			<FormLabel htmlFor='email'>Email</FormLabel>
			<Input onChange={handleChange} name="email" variant='flushed' focusBorderColor='green.400' size='lg' type='email' placeholder='Email' /> 
		</FormControl>
		<FormControl isRequired>
			<FormLabel htmlFor='password'>Password</FormLabel>
			<Input onChange={handleChange} name="password" variant='flushed' focusBorderColor='green.400' size='lg' type='password' placeholder='Enter password' />
		</FormControl>
		<ButtonGroup w='100%'>
			<Link href='/'>
				<Button w='100%'>Home</Button>
			</Link>
			<Button type="submit" isLoading={isLoading} isFullWidth size='md' colorScheme="green">Login</Button>
	  	</ButtonGroup>
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
