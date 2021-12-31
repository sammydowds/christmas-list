import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Christmas List App</title>
        <meta name="description" content="Christmas Shopping App Easy" />
        <link rel="icon" href="/images/sm-santa.svg" />
      </Head>

      <main>
        Impish or Admirable? 
        Make Christmas Shopping Easier. 
      </main>

      <footer>
        Powered by
        <Image src="/images/sm-santa.svg" alt="Santa Claus" width={72} height={16} />
      </footer>
    </div>
  )
}

export default Home
