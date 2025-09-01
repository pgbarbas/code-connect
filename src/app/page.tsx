import { CardPost } from "@/components/CardPost"
import logger from "@/logger"
import styles from './page.module.css'
import Link from "next/link"
import db from "../../prisma/db"
import { Prisma } from '../generated/prisma'

interface PostData {
  data: any[];
  prev: string | null;
  next: string | null;
}

async function getAllPosts(page: any, searchTerm: any): Promise<PostData> {
  try {

    const where: Prisma.PostWhereInput = {}

    if (searchTerm) {
      where.title = {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }


    const perPage = 4;
    const skip = (page - 1) * perPage
    const totalItems = await db.post.count({ where })
    const totalPages = Math.ceil(totalItems / perPage)
    const prev = page > 1 ? String(page - 1) : null
    const next = page < totalPages ? String(page + 1) : null
    const posts = await db.post.findMany({

      take: perPage,
      skip,
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true
      }
    })

    return { data: posts, prev, next }

  } catch (error) {
    logger.error('Falha ao obter posts', { error })
    return { data: [], prev: null, next: null }
  }
}

interface HomeProps {
  searchParams?: {
    page?: string;
    q?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {

  const currentPage = parseInt(searchParams?.page ?? "1", 10)
  const searchTerm = searchParams?.q
  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm)
  return (
    <main className={styles.grid}>
      {posts.map((post: any) => <CardPost key={post.id} post={post} />)}
      <div className={styles.links}>
        {prev !== null && <Link href={{ pathname: '/', query: { page: prev, q:searchTerm }}}>Página anterior</Link>}
        {next !== null && <Link href={{ pathname: '/', query: { page: next, q:searchTerm }}}>Próxima página</Link>}
      </div>
    </main>
  )
}