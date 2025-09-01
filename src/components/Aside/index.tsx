import Image from 'next/image'
import styles from './aside.module.css'
import logo from './logo.png'
import Link from 'next/link'

export const Aside = () => {
    return (
        <aside className={styles.aside}>
            <Link href="/">
                <Image src={logo} alt='Logo do site' />
            </Link>
            <i className="uil uil-user text-4xl text-blue-600"></i>
        </aside>
    )
}