import { AccountInfo } from "../components/AccountInfo"
import { Present, List, ListType } from '../components/List'
import { VStack, Flex, Text, Heading } from '@chakra-ui/react'
import { useGetUserQuery, useLogoutMutation } from "../redux/services/christmasList"
import { useEffect } from "react"
import Router from "next/router"

interface PresentsByPerson {
    [name: string]: Present[]
}

// resonse that returns everyone but the user logged in
const presentsByPerson: PresentsByPerson = {
    "Kate": [
        {
            description: 'New Iphone',
            to: 'Kate',
            from: null,
            isBought: false,
            id: '24'
        }
    ],
    "Sammy": [
        {
            description: 'Something Cool',
            to: 'Sammy',
            from: 'Kate',
            isBought: true,
            id: '23'
        },
        {
            description: 'Fire Truck',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '26'
        }
    ],
    "Carly": [
        {
            description: 'Something Cool',
            to: 'Carly',
            from: 'Kate',
            isBought: true,
            id: '23'
        },
        {
            description: 'Fire Truck',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '26'
        },
        {
            description: 'Soccer ball',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '29'
        },
        {
            description: 'Soccer net',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '30'
        },
        {
            description: 'Soccer shirt',
            to: 'Carly',
            from: 'Sammy',
            isBought: false,
            id: '28'
        }
    ],
}

// a response that returns presents that you want
// a response that returns presents that are "from" you (shopping list)
const presentList: Present[] = [
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: null,
        isBought: false,
        id: '0'
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
        id: '1'
    }, 
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
        id: '2'
    },
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
        id: '3'
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
        id: '4'
    }, 
    {
        description: 'New Shiny Truck',
        to: 'Kate', 
        from: 'Sammy',
        isBought: false,
        id: '5'
    },
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
        id: '6'
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
        id: '7'
    }, 
    {
        description: 'New Shiny Truck', 
        to: 'Carly',
        from: 'Sammy',
        isBought: false,
        id: '8'
    }
]

const EmptyOtherWishlists = () => {
    return (
        <Flex p='20px' direction='column' justify='center' align='center' borderWidth='2px' borderRadius='10px'>
            <Heading as='h4' size='md'>No Members To Shop For!</Heading>
            <Text noOfLines={4}>Please add members to your Family!</Text>
        </Flex>
    )
}
interface OtherWishlists {
    presentsByPerson: PresentsByPerson
}
const OtherWishlists = ({ presentsByPerson }: OtherWishlists) => {
    if (Object.keys(presentsByPerson).length) {
        return (
            <>
                {Object.entries(presentsByPerson).map(([name, presents]) => {
                    return (
                    <List key={`${name}-wishlist`} listType={ListType.WISHLIST} title={`${name} Wishlist`} presents={presents} />
                    )
                })}
            </>
        )
    }
    return <EmptyOtherWishlists />
}


const Dashboard = () => {
    const { data: user = {}, isFetching, error } = useGetUserQuery()
    const [ logout ] = useLogoutMutation()
    const othersWishlists = {} // TODO: select this from Redux
    const ownWishlist: Present[] = [] // TODO: off of user
    const ownShoppingList: Present[] = [] // TODO: off of user

    useEffect(() => {
        if (!user?.email && !isFetching) {
            Router.push('/login')
        } else {
            // FETCH others wishlists in family 
        }
    }, [user, isFetching])

    const handleLogout = async () => {
        await logout()
        Router.push('/login')
    }

    const isImpish = user?.shoppingList && Array.isArray(user?.shoppingList) &&  user.shoppingList.length > 0
    return(
      <VStack my='20px'>
        <AccountInfo isImpish={isImpish} email={user?.email} passcode={user?.family?.passcode} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
        <List listType={ListType.SHOPPING} title={'Your Shopping List'} presents={ownShoppingList}/>
        <List listType={ListType.OWN_WISHLIST} title={'Your Wishlist'} presents={ownWishlist}/>
        <OtherWishlists presentsByPerson={othersWishlists} />
      </VStack>
    )
}

export default Dashboard
