import { Loading } from '../Loading'
import { Box, Button, VStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import Router from 'next/router'
import { useLoginMutation } from '../../redux/services/christmasList'

export const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: ''})
  const [login, { isLoading, error }] = useLoginMutation()
  const handleSubmit = async () => {
    await login(formState).unwrap().then(() => Router.push('/dashboard'))
  }
  const handleChange = ({
    target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => 
      setFormState((prev) => ({...prev, [name]: value }))
  // TODO: type error message
  return (
      <VStack minW='300px' spacing='20px'>
        <Input onChange={handleChange} name="email" variant='flushed' focusBorderColor='green.400' size='lg' type='email' placeholder='Email' /> 
        <Input onChange={handleChange} name="password" variant='flushed' focusBorderColor='green.400' size='lg' type='password' placeholder='Enter password' />
        <Button isLoading={isLoading} isFullWidth onClick={handleSubmit} size='md' colorScheme="green">Login</Button>
	<Box maxW='250px' height='50px'>
	  {isLoading && <Loading />}
	  {error && error?.data?.error}
	</Box>
      </VStack>
  )
}
