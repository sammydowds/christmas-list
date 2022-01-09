import { List } from "../List"
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
        <List typeOfList={ListType.SHOPPING} title={'Shopping List'} presents={shoppingList} />
    )
}