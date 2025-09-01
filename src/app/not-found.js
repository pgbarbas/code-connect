import Image from 'next/image'
import banner from './error/500.png'
import { ArrowBack } from '@/components/icons/ArrowBack'
import Link from 'next/link'
import { Heading } from '@/components/Heading'
import style from "./not-found/not-found.module.css"

export default function NotFound() {
    return (
        <div className={style.container}>


            <Image src={banner} />


            <Heading>Ops, pagina nao encontrada!</Heading>


            <p className={style.text}>Não conseguimos carregar a página, volte para seguir navegando.</p>


            <Link href="/">


                Voltar ao feed <ArrowBack color='#81FE88' />


            </Link>

        </div>
    )
}