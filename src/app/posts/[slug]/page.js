import logger from "@/logger"
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image'
import styles from './page_slug.module.css'
import { Avatar } from "../../../components/Avatar"
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import db from "../../../../prisma/db"
import { redirect } from "next/navigation";

async function getPostBySlug(slug) {

    try {
        const post = await db.post.findFirst({
            where: {
                slug
            },
            include: {
                author: true
            }
        })

        if (!post) {
            throw new Error(`Post com o slug ${slug} nao encontrado`)
        }

        const processedContent = await remark()
            .use(html)
            .process(post.markdown)
        const contentHtml = processedContent.toString();

        post.markdown = contentHtml

        return post
    } catch(error) {
        logger.error('Falha ao obter o post com o slug ', {
            slug,
            error
        })
    }

    redirect('/not-found')
}

const PagePost = async ({ params }) => {
    const post = await getPostBySlug(params.slug)
    return (<>
        <header className={styles.header}>
            <figure className={styles.figure}>
                <Image
                    src={post.cover}
                    width={950}
                    height={300}
                    alt={`Capa do post de titulo: ${post.title}`}
                    className={styles.imaginha}
                />
            </figure>
        </header>
        <section className={styles.body}>
            <h2 className={styles.titulo}>{post.title}</h2>
            <p className={styles.texto}>{post.body}</p>
        </section>
        <footer className={styles.footer}>
            <Avatar
                imageSrc={post.author.avatar}
                name={post.author.username}
            />
        </footer>
    </>)
}

export default PagePost