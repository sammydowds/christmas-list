import { List } from "@chakra-ui/react"
import { Present } from "../../pages/dashboard"
import { ListType } from "../List"

interface OwnWishlistProps {
    wishlist?: Present[]
}
export const OwnWishlist = ({ wishlist }: OwnWishlistProps) => {
    if (!wishlist) {
        return null
    }
    return (
        <List type={ListType.OWN_WISHLIST} title={'Your Wishlist'} presents={wishlist} />
    )
}