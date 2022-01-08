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
    const { data, isFetching } = useGetUserQuery()
    const [logout] = useLogoutMutation()
    const [selectedFamily, setSelectedFamily] = useState({_id: '', name: '', passcode: '', members: []} as Family)

    useEffect(() => {
        if (!data?.isLoggedIn && isFetching === false) {
            Router.push('/login')
        }
    }, [data, isFetching])

    const handleLogout = () => {
        logout()
        Router.push('/login')
    }

    const handleSelectedFamilyIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        const familyId = event.target.value
        const family = data?.families.filter((family: Family) => {
            return family._id === familyId
        })[0]
        family && setSelectedFamily(family)
    }

    const isImpish = data?.shoppingList && Array.isArray(data?.shoppingList) && data.shoppingList.length > 0
    return (
        <VStack my='20px'>
            <AccountInfo isImpish={isImpish} name={data?.name} email={data?.email} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
            <ManageFamilies families={data?.families} />
            <Heading>{selectedFamily.name} Family</Heading>
            {!isFetching && data?.wishlist && <OwnWishlist wishlist={data?.wishlist} />}
            {!isFetching && data?.shoppingList && <ShoppingList shoppingList={data?.shoppingList} />}
            <SelectFamily selectedFamilyId={selectedFamily._id} onChange={handleSelectedFamilyIdChange} families={data?.families} />
            {selectedFamily._id !== '' && <OthersWishlists selectedFamily={selectedFamily} />}
        </VStack>
    )
}

export default Dashboard
