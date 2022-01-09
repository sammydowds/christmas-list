import { AccountInfo } from "../components/AccountInfo"
import { VStack, Heading, Select, useMediaQuery, Grid, GridItem, Flex, Spacer } from '@chakra-ui/react'
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
    description: string,
    familyId: string
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
        <Select w='100%' textAlign='center' value={selectedFamilyId} onChange={onChange} placeholder='Select family'>
            {
                families?.map((family) => {
                    return <option key={family?._id} value={family?._id}>{family?.name}</option>
                })
            }
        </Select>
    )
}


const Dashboard = () => {
    const [isLargerThan880] = useMediaQuery('(min-width:880px)')
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

    if (isLargerThan880) {
        return (
            <Grid 
                h='100vh'
                templateColumns='repeat(5, 1fr)'
                gap='20px'
            >
                <GridItem colSpan={2} p='20px'>
                    <VStack>
                        <AccountInfo isImpish={isImpish} name={data?.name} email={data?.email} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
                        <ManageFamilies families={data?.families} />
                    </VStack>
                </GridItem>
                <GridItem colSpan={3} p='20px' textAlign='center' overflow='scroll'>
                    <SelectFamily selectedFamilyId={selectedFamily._id} onChange={handleSelectedFamilyIdChange} families={data?.families} />
                    <Heading>{selectedFamily.name} Family</Heading>
                    {selectedFamily._id !== '' && <OthersWishlists selectedFamily={selectedFamily} />}
                </GridItem>
            </Grid>
        )
    } else {
        return (
            <Grid
                h='100vh'
                gap='20px'
                p='20px'
            >
                <GridItem>
                    <AccountInfo isImpish={isImpish} name={data?.name} email={data?.email} onClickDeleteAccount={() => alert('Delete account...')} onClickLogout={handleLogout} />
                </GridItem>
                <GridItem overflow='scroll'>
                    <VStack>
                        <ManageFamilies families={data?.families} />
                        <OwnWishlist families={data?.families} wishlist={data?.wishlist} />
                        <ShoppingList shoppingList={data?.shoppingList} />
                        <SelectFamily selectedFamilyId={selectedFamily._id} onChange={handleSelectedFamilyIdChange} families={data?.families} />
                        <Heading>{selectedFamily.name} Family</Heading>
                        {selectedFamily._id !== '' && <OthersWishlists selectedFamily={selectedFamily} />}
                    </VStack>
                </GridItem>
            </Grid>
        )
    }
}

export default Dashboard
