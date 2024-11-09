import Comments from "@/components/comments"
import FormComment from "@/components/formComment"
import { prisma } from "@/lib/prismadb"

type BlogDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  })
  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold'>{post?.title}</h1>
      <p>Written by: {post?.author?.name}</p>
      <div className='mt-4'>{post?.content}</div>
      <Comments postId={post?.id || ""} />
      <FormComment postId={post?.id || ""} />
    </div>
  )
}

export default BlogDetailPage
