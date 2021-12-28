
/**@jsxImportSource @emotion/react */
import { ChristmasLightStrand } from "../components/ChristmasLightStrand"
import * as styles from "../styles/styles"
import Image from "next/image"
import { LoginForm } from "../components/LoginForm"

const Login = () => {
    return(
        <div css={styles.loginContainer}>
            <div css={styles.topLights}>
                <ChristmasLightStrand />
            </div>
            <div css={styles.formContainer}>
                <Image 
                    src='/images/sm-santa.svg'
                    height={150}
                    width={150}
                />
                <LoginForm loading/>
            </div>
            <div css={styles.bottomLights}>
                <ChristmasLightStrand invert/>
            </div>
        </div>
    )
}

export default Login