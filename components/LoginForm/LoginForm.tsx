/**@jsxImportSource @emotion/react */
import { Loading } from '../Loading'
import * as styles from './styles'

interface LoginFormProps {
    onSubmit?: () => void
    onChangeUsername?: () => void
    onChangePassword?: () => void
    password?: string
    username?: string
    loading?: boolean
}

export const LoginForm = ({ loading }: LoginFormProps) => {
    return (
        <form css={styles.form}>
            <label css={styles.label}>
                Username
                <input css={styles.input} />
            </label>
            <label css={styles.label}>
                Password
                <input css={styles.input} />
            </label>
            <button css={styles.submitButton}>Enter</button>
            {loading && <Loading />}
        </form>
    )
}