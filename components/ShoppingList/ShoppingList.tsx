import { List } from "@chakra-ui/react"
import { Present } from "../../pages/dashboard"
import { ListType } from "../List"

interface ShoppingListProps {
    shoppingList?: Present[]
}
export const ShoppingList = ({ shoppingList }: ShoppingListProps) => {
    if (!shoppingList) {
        return null
    }
    return (
        <List type={ListType.OWN_WISHLIST} title={'Shopping List'} presents={shoppingList} />
    )
}