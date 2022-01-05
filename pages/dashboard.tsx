import { AccountInfo } from "../components/AccountInfo"
import { List, ListType } from '../components/List'
import { VStack, Flex, Text, Heading, Select } from '@chakra-ui/react'
import { useGetUserQuery, useLogoutMutation, useGetFamilyWishlistsQuery } from "../redux/services/christmasList"
import { useEffect, useState } from "react"
import Router from "next/router"
import { Family } from "../components/Family"
import mongoose from "mongoose"

export interface Family {
    _id: string,
    members: mongoose.ObjectId[],
    name: string,
    passcode: string
}

export interface Present {
    _id: string,
    to: string,
    from: string,
    isBought: boolean,
    description: string
}

export interface User {
    _id: string,
    families: Family[],
    email: string,
    wishlist: Present[],
    shoppingList: Present[],
    isLoggedIn: boolean,
    name: string
}

export interface FamilyWishlists {
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
    selectedFamily: Family
}
const OtherWishlists = ({ selectedFamily }: OtherWishlists) => {
    const { data: familyWishlists, isFetching: isFetchingWishlists, error: wishlistsError } = useGetFamilyWishlistsQuery(selectedFamily._id, {
        skip: !selectedFamily
    })

    if (familyWishlists && Object.keys(familyWishlists).length) {
        return (
            <>
                {Object.entries(familyWishlists).map(([name, presents]) => {
                    return (
                        <List key={`${name}-wishlist`} listType={ListType.WISHLIST} title={`${name} Wishlist`} presents={presents} />
                    )
                })}
            </>
        )
    }
    return <EmptyOtherWishlists />
}

interface SelectFamilyProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    families?: Family[]
    selectedFamilyId?: string
}
const SelectFamily = ({ families, onChange, selectedFamilyId }: SelectFamilyProps) => {
    return(
        <Select value={selectedFamilyId} onChange={onChange} placeholder='Select family' maxW='250px'>
            {
                families?.map((family) => {
                    return <option key={family?._id} value={family?._id}>{family?.name}</option>
                })
            }
        </Select>
    )
}


const Dashboard = () => {
    const { data: user, isFetching } = useGetUserQuery()
    const [logout] = useLogoutMutation()
    const [selectedFamily, setSelectedFamily] = useState({_id: '', name: '', passcode: '', members: []} as Family)

    useEffect(() => {
        if (!user?.isLoggedIn && isFetching === false) {
            Router.push('/login')
        }
    }, [user, isFetching])

    const handleLogout = () => {
        logout()
        Router.push('/login')
    }

    const handleSelectedFamilyIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        const familyId = event.target.value
        const family = user?.families.filter((family: Family) => {
            return family._id === familyId
        })[0]
        family && setSelectedFamily(family)
    }

    const isImpish = user?.shoppingList && Array.isArray(user?.shoppingList) && user.shoppingList.length > 0
    return (
        <VStack my='20px'>
            {/* TODO: create a component to add and delete a family (put at very bottom) */}
            {/* TODO: allow creation of naming a family */}
            <AccountInfo isImpish={isImpish} name={user?.name} email={user?.email} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
            <SelectFamily selectedFamilyId={selectedFamily._id} onChange={handleSelectedFamilyIdChange} families={user?.families} />
            <Family name={selectedFamily?.name} passcode={selectedFamily?.passcode} />
            <Heading>{selectedFamily.name} Family</Heading>
            {/* TODO: separate out own wishlist into own component */}
            {/* TODO: loop through wishlist by family for different sections of the wishlist */}
            {/* TODO: move whishlists above own wishlist */}
            {user?.wishlist && < List listType={ListType.OWN_WISHLIST} title={'Your Wishlist'} presents={user?.wishlist} />}
            {/* TODO: modify GET request for family wishlists to handle passing in family ID as well, then make call from component below */}
            {selectedFamily._id !== '' && < OtherWishlists selectedFamily={selectedFamily} />}
            {/* TODO: shopping list should stay the same */}
            {user?.shoppingList && <List listType={ListType.SHOPPING} title={'Your Shopping List'} presents={user?.shoppingList} />}
        </VStack>
    )
}

export default Dashboard
