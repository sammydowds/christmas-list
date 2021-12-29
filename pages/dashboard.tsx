/**@jsxImportSource @emotion/react */
import { AccountInfo } from "../components/AccountInfo"
import { Present, List, ListType } from '../components/List'
import { present } from "../components/List/styles"
import * as styles from '../styles/styles'

const presentsByPerson: { [name: string]: Present[] } = {
    "Kate": [
        {
            description: 'New Iphone',
            to: 'Kate',
            from: null,
            isBought: false,
            id: '24'
        }
    ],
    "Sammy": [
        {
            description: 'Something Cool',
            to: 'Sammy',
            from: 'Kate',
            isBought: true,
            id: '23'
        },
        {
            description: 'Fire Truck',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '26'
        }
    ],
    "Carly": [
        {
            description: 'Something Cool',
            to: 'Carly',
            from: 'Kate',
            isBought: true,
            id: '23'
        },
        {
            description: 'Fire Truck',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '26'
        },
        {
            description: 'Soccer ball',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '29'
        },
        {
            description: 'Soccer net',
            to: 'Sammy',
            from: null,
            isBought: false,
            id: '30'
        },
        {
            description: 'Soccer shirt',
            to: 'Carly',
            from: 'Sammy',
            isBought: false,
            id: '28'
        }
    ],
}

const presentList: Present[] = [
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: null,
        isBought: false,
        id: '0'
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
        id: '1'
    }, 
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
        id: '2'
    },
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
        id: '3'
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
        id: '4'
    }, 
    {
        description: 'New Shiny Truck',
        to: 'Kate', 
        from: 'Sammy',
        isBought: false,
        id: '5'
    },
    {
        description: 'New Shiny Truck', 
        to: 'Justin',
        from: 'Sammy',
        isBought: false,
        id: '6'
    }, 
    {
        description: 'Red Ryder BB Gun', 
        to: 'Sammy',
        from: 'Sammy',
        isBought: false,
        id: '7'
    }, 
    {
        description: 'New Shiny Truck', 
        to: 'Carly',
        from: 'Sammy',
        isBought: false,
        id: '8'
    }
]

const Dashboard = () => {
    return(
        <div css={styles.dashboardContainer}>
            <div css={styles.dashboardColContainer}>
                <AccountInfo />
                {Object.entries(presentsByPerson).map(([name, presents]) => {
                    return (
                        <List listType={ListType.WISHLIST} title={`${name} Wishlist`} presents={presents} />
                    )
                })}
                <List listType={ListType.SHOPPING} title={'Your Shopping List'} presents={presentList}/>
            </div>
        </div>
    )
}

export default Dashboard