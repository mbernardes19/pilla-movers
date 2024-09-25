import { Section } from "@/components/Section/Section";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

export async function generateStaticParams() {
    const query = `*[_type == "page"]{ "slug": slug.current }`
    const slugs = await client.fetch(query)
   
    return slugs.map((slug: { slug: string; }) => ({
        slug: slug.slug,
    }))
}

async function getPageBySlug(slug: string) {
    const query = `*[_type == "page" && slug.current == $slug][0]{
      hero->{
        headline,
        subheadline
      },
        sections[]->{
            title,
            headline,
            subheadline,
            content{
                content_blocks[]
            },
            ctas[]->{
                text,
                link,
                icon
            }
        }
    }`
  
    const params = { slug }
  
    const page = await client.fetch(query, params)
    return page
  }

export default async function Page({ params }: { params: { slug: string }}) {
    const { slug } = params
    const { hero, sections } = await getPageBySlug(slug)
    console.log('=== slug', slug)

    return (
        <>
            {sections.map((section, idx) => (
               <Section key={idx} data={section} /> 
            ))}
        </>
    );
}
