import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
    const body = await request.json()
    const slug = `/${body.slug.current}`
    try {
        revalidatePath(slug)
      return new Response(`Revalidated path ${slug}`, {
        status: 200
      })
    } catch (err) {
        return new Response(`Failed to revalidate path ${slug}: ${err}`, {
            status: 500
        })
    }
}