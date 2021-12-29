/**@jsxImportSource @emotion/react */
import * as styles from './styles'

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
  onClick?: () => void
}
const ListItem = ({present, onClick, listType}: ListItemProps) => {
  if (listType === ListType.WISHLIST) {
    return (
      <div key={`${present.id}-wishlist`} onClick={onClick} css={[styles.present, present.from && styles.presentCrossedOff]}>
        {present.description}
      </div>
    )
  } else if (listType === ListType.SHOPPING) {
    return (
      <div key={`${present.id}-shopping`} onClick={onClick} css={[styles.present, present.isBought && styles.presentCrossedOff]}>
        {present.description}
        {present.to && <span> - {present.to}</span>}
      </div>
    )
  } else if (listType === ListType.OWN_WISHLIST) {
    return (
      <div key={`${present.id}-own-wishlist`} onClick={onClick}>
        {present.description}
        {present.to && <span> - {present.to}</span>}
      </div>
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
        <ListItem present={present} listType={listType} />
      )
    })}
    </div>
  )
}
