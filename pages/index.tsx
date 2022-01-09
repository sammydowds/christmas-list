import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Christmas List App</title>
        <meta name="description" content="Christmas Shopping App Easy" />
        <link rel="icon" href="/images/sm-santa.svg" />
      </Head>

      <main>
        <Center alignText='center' bgColor='#E0C9A625'>
          <VStack maxW='400px' p='20px' h='100vh' justifyContent='space-around'>
            <Heading as='h4' size='md' textAlign='center'>
              Manage Your Christmas Lists 
            </Heading>
            <Text>
              Tired of multiple group texts discussing Christmas gifts? 
              This app is designed to manage, create, and view all of your family wishlists in one place.
            </Text>
            <Text>
              You can claim presents to buy which automatically updates your shopping list. Once you buy those presents, cross them off. 
              You can see which presents are being bought by who (except for your own).
              Join and help Santa deliver on a busy season! 
            </Text>
            <Text>
              We support managing multiple families out of the box. Just share your family passcode with a family member!
            </Text>
            <VStack mY='10px'>
              <Link href='/login'>
                <Button colorScheme='green' w='100%' rightIcon={<ExternalLinkIcon />}>Login</Button>
              </Link>
              <Link href='/create'>
                <Button colorScheme='green' w='100%' rightIcon={<ExternalLinkIcon />}>Create Accound And Join Family</Button>
              </Link>
              <Link href='/join'>
                <Button colorScheme='green' w='100%' rightIcon={<ExternalLinkIcon />}>Create Accound And Join Family</Button>
              </Link>
            </VStack>
          </VStack>
        </Center>
      </main>
    </div>
  )
}

export default Home
