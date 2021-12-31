import { Loading } from '../Loading'
import { Button, VStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

interface LoginFormProps {
    onSubmit?: () => void
    onChangeUsername?: () => void
    onChangePassword?: () => void
    password?: string
    username?: string
    loading?: boolean
}

export const LoginForm = ({ loading }: LoginFormProps) => {
  const [formState, setFormState] = useState({ email: '', password: ''})
  // TODO: add in call to login user 
  const handleChange = ({
    target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => 
      setFormState((prev) => ({...prev, [name]: value }))
  return (
      <VStack spacing='20px'>
	<Input onChange={handleChange} name="email" variant='flushed' focusBorderColor='green.400' size='lg' type='email' placeHolder='Email' /> 
	<Input onChange={handleChange} name="password" variant='flushed' focusBorderColor='green.400' size='lg' type='password' placeHolder='Enter password' />
	<Button size='md' colorScheme="green">Login</Button>
      </VStack>
  )
}
