/**@jsxImportSource @emotion/react */
import { AccountInfo } from "../components/AccountInfo"
import { Present, List, ListType } from '../components/List'
import { VStack } from '@chakra-ui/react'

// resonse that returns everyone but the user logged in
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

// a response that returns presents that you want
// a response that returns presents that are "from" you (shopping list)
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
    // TODO: load data slices with api slice rtk query 
    // TODO: build in auth logic
    // TODO: rebuild this with Chakra
    return(
      <VStack>
        <AccountInfo hasPresentsToBuy anyPresentsToBuy name={"Cassie"}/>
        {Object.entries(presentsByPerson).map(([name, presents]) => {
            return (
            <List key={`${name}-wishlist`} listType={ListType.WISHLIST} title={`${name} Wishlist`} presents={presents} />
            )
        })}
        <List listType={ListType.SHOPPING} title={'Your Shopping List'} presents={presentList}/>
        <List listType={ListType.OWN_WISHLIST} title={'Your List'} presents={presentList}/>
      </VStack>
    )
}

export default Dashboard
