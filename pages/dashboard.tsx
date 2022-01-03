import { AccountInfo } from "../components/AccountInfo"
import { Present, List, ListType } from '../components/List'
import { VStack, Flex, Text, Heading } from '@chakra-ui/react'
import { useGetUserQuery, useLogoutMutation, useGetFamilyWishlistsQuery } from "../redux/services/christmasList"
import { useEffect } from "react"
import Router from "next/router"

interface PresentsByPerson {
    [name: string]: Present[]
}

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
    const { data: user = {}, isFetching } = useGetUserQuery()
    const { data: familyWishlists, isFetching: isFetchingWishlists, error: wishlistsError } = useGetFamilyWishlistsQuery()
    const [logout] = useLogoutMutation()

    useEffect(() => {
        if (!user?.isLoggedIn && isFetching === false) {
            Router.push('/login')
        }
    }, [user, isFetching])

    const handleLogout = () => {
        logout()
        Router.push('/login')
    }

    const { shoppingList, wishlist, family } = user

    const isImpish = user?.shoppingList && Array.isArray(user?.shoppingList) && user.shoppingList.length > 0
    return (
        <VStack my='20px'>
            <AccountInfo isImpish={isImpish} email={user?.email} passcode={family?.passcode} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
            {wishlist && < List listType={ListType.OWN_WISHLIST} title={'Your Wishlist'} presents={wishlist} />}
            {familyWishlists && < OtherWishlists presentsByPerson={familyWishlists} />}
            {shoppingList && <List listType={ListType.SHOPPING} title={'Your Shopping List'} presents={shoppingList} />}
        </VStack>
    )
}

export default Dashboard
