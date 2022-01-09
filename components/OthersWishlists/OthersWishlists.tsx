import { Flex, Heading, Text} from "@chakra-ui/react"
import { Family } from "../../pages/dashboard"
import { useGetFamilyWishlistsQuery } from "../../redux/services/christmasList"
import { List, ListType } from "../List"

const EmptyOtherWishlists = () => {
    return (
        <Flex p='20px' w='100%' direction='column' justify='center' align='center' borderWidth='2px' borderRadius='10px'>
            <Heading as='h4' size='md'>No Members To Shop For!</Heading>
            <Text noOfLines={4}>Please add members to your Family!</Text>
        </Flex>
    )
}
interface OthersWishlists {
    selectedFamily: Family
}
export const OthersWishlists = ({ selectedFamily }: OthersWishlists) => {
    const { data: familyWishlists, isFetching: isFetchingWishlists, error: wishlistsError } = useGetFamilyWishlistsQuery(selectedFamily._id, {
        skip: !selectedFamily
    })

    if (familyWishlists && Object.keys(familyWishlists).length) {
        return (
            <>
                {Object.entries(familyWishlists).map(([name, presents]) => {
                    return (
                        <List key={`${name}-wishlist`} typeOfList={ListType.WISHLIST} title={`${name} Wishlist`} presents={presents} />
                    )
                })}
            </>
        )
    }
    return <EmptyOtherWishlists />
}