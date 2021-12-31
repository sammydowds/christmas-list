/**@jsxImportSource @emotion/react */
import * as styles from './styles'
import Image from 'next/image'

export enum ListType {
  SHOPPING = 'shopping', 
  OWN_WISHLIST = 'own_wishlist',
  WISHLIST = 'wishlist'
}

export interface Present {
  description: string, 
  to: string
  from: string | null
  isBought: boolean
  id: string
}

interface ListItemProps {
  present: Present,
  listType: ListType
}
const ListItem = ({present, listType}: ListItemProps) => {
  // set state here as the present? each item manages present state
  // TODO: implement delete present, update present, and click present
  if (listType === ListType.WISHLIST) {
    return (
      <div css={[styles.present, present.from && styles.presentCrossedOff]}>
        <span css={present.from && styles.presentCrossedOffText}>{present.description}</span>
        {present.from && <Image src='/images/sm-santa.svg' height={25} width={25} />}
        {present.from && <span>({present.from})</span>}
      </div>
    )
  } else if (listType === ListType.SHOPPING) {
    return (
      <div css={[styles.present, present.isBought && styles.presentCrossedOff]}>
        {present.description}
        {present.to && <span> - {present.to}</span>}
      </div>
    )
  } else if (listType === ListType.OWN_WISHLIST) {
    return (
      <input css={styles.yourPresent} value={present.description} />
   )
  }
  return <div></div>
}

export interface ListProps {
  presents?: Present[]
  title?: string
  isEditable?: boolean
  listType: ListType
}
export const List = ({ presents, title, listType }: ListProps) => {
  return (
    <div css={styles.container}>
      <h4>{title}</h4>
      {presents?.map((present: Present) => {
      return (
        <ListItem key={`${present.id}-${listType}`} present={present} listType={listType} />
      )
    })}
    </div>
  )
}
