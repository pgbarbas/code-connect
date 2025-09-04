import styles from './iconbutton.module.css'
export const IconButton = ({ childre, ...rest }) => {

    return (<button {...rest} className={styles.btn}>
        {children}
    </button>)

}