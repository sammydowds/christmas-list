
/**@jsxImportSource @emotion/react */
import Image from 'next/image'
import * as styles from './styles'

export const Loading = () => {
  return(
    <div css={styles.container}>
      <div>
        <Image 
          src={'/images/candy-cane.svg'}
          height={50}
          width={50}
        />
        <Image 
          src={'/images/candy-cane.svg'}
          height={50}
          width={50}
        />
        <Image 
          src={'/images/candy-cane.svg'}
          height={50}
          width={50}
        />
      </div>
      Connecting to Northpole servers...
    </div>
  )
}
