/**@jsxImportSource @emotion/react */
import * as styles from './styles'
import Image from 'next/image'

const ImpishStatus = () => {
  return(
    <div css={styles.status}>
      Status:&nbsp;
      <span css={styles.impishText}>
        IMPISH
        <Image 
          src='/images/impish.svg'
          height={20}
          width={20}
        />
      </span>
    </div>
    
  )
}

const AdmirableStatus = () => {
  return(
    <div css={styles.status}>
      Status:&nbsp;
      <span css={styles.admirableText}>
        ADMIREABLE
        <Image 
          src='/images/sm-santa.svg'
          height={20}
          width={20}
        />
      </span>
    </div>
    
  )
}

interface AccountInfoProps {
  hasPresentsToBuy: boolean
  anyPresentsToBuy: boolean
  name: string
}
export const AccountInfo = ({ hasPresentsToBuy, anyPresentsToBuy, name }: AccountInfoProps) => {
  return(
    <div css={styles.container}>
      <div css={styles.connectionStatus}>
        Connected to Northpole Servers:&nbsp; 
        <Image src={'/images/check-circle.svg'} height={20} width={20} />
      </div>
      <div>
        Logged in as: {name}
      </div>
      <div>
        {(hasPresentsToBuy || anyPresentsToBuy) ? <ImpishStatus /> : <AdmirableStatus />}
      </div>
    </div>
  )
}
