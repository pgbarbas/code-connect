import styles from './searchform.module.css'
import Form from 'next/form'

export const SearchForm = () => {
    return (
        <Form action="/" className={styles.form}>
            <input name='q' placeholder='Digite o que voce procura' />
            <button type='submit'>Buscar</button>
        </Form>
    )
}