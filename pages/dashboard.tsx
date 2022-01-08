import { AccountInfo } from "../components/AccountInfo"
import { VStack, Heading, Select } from '@chakra-ui/react'
import { useGetUserQuery, useLogoutMutation } from "../redux/services/christmasList"
import { useEffect, useState } from "react"
import Router from "next/router"
import { Family } from "../components/Family"
import mongoose from "mongoose"
import { ManageFamilies } from "../components/ManageFamilies"
import { OthersWishlists } from "../components/OthersWishlists"
import { OwnWishlist } from "../components/OwnWishlist"
import { ShoppingList } from "../components/ShoppingList"

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
            <AccountInfo isImpish={isImpish} name={user?.name} email={user?.email} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
            <ManageFamilies families={user?.families} />
            <SelectFamily selectedFamilyId={selectedFamily._id} onChange={handleSelectedFamilyIdChange} families={user?.families} />
            <Heading>{selectedFamily.name} Family</Heading>
            {user?.wishlist && <OwnWishlist wishlist={user?.wishlist} />}
            {user?.shoppingList && <ShoppingList shoppingList={user?.shoppingList} />}
            {selectedFamily._id !== '' && <OthersWishlists selectedFamily={selectedFamily} />}
        </VStack>
    )
}

export default Dashboard
