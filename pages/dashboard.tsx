/**@jsxImportSource @emotion/react */
import { AccountInfo } from "../components/AccountInfo"
import { Present, List, ListType } from '../components/List'
import * as styles from '../styles/styles'

const defaultList: Present[] = [
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: null,
        isBought: false,
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
    }, 
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
    },
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
    }, 
    {
        description: 'New Shiny Truck',
        to: 'Kate', 
        from: 'Sammy',
        isBought: false,
    },
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
    }, 
    {
        description: 'New Shiny Truck', 
        to: 'Carly',
        from: 'Sammy',
        isBought: false,
    }
]

const Dashboard = () => {
    return(
        <div css={styles.dashboardContainer}>
            <div css={styles.dashboardColContainer}>
                <AccountInfo />
                <List listType={ListType.WISHLIST} title={'Someones Wishlist'} presents={defaultList}/>
                <List listType={ListType.SHOPPING} title={'Your Shopping List'} presents={defaultList}/>
            </div>
        </div>
    )
}

export default Dashboard