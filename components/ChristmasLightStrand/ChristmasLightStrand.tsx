
/**@jsxImportSource @emotion/react */
import { ChristmasLight } from "../ChristmasLight"
import * as styles from './styles'

interface ChristmasLightStrandProps {
  invert?: boolean;
}

const ChristmasLightMiniStrand = () => {
  return (
    <>
      <ChristmasLight color="blue" />
      <ChristmasLight color="red" />
      <ChristmasLight color="green" />
    </>
  )
}

export const ChristmasLightStrand = ({ invert }: ChristmasLightStrandProps) => {
  const numberOfMiniStrands = 1440/75 // find how many stands for 1440px
  return(
    <div css={[styles.lightStrand, invert && styles.invertLights]}>
      {Array(Math.round(numberOfMiniStrands)).fill(<ChristmasLightMiniStrand />)}
    </div>
  )
}
