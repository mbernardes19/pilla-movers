import { Section } from "@/components/Section/Section";
import { client } from "@/sanity/lib/client";
import { Page as PageType, Section as SectionType } from "../../../sanity.types";

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
        subheadline,
        video_background {
            asset->{
                url
            }
        },
        content{
            content_blocks[]
        },
    },
    sections[]->{
        title,
        headline,
        subheadline,
        content{
            render_as,
            content_blocks[]
        },
        ctas[]->{
            text,
            link,
            icon,
            type
        },
        background_color
    }
}`
  
    const params = { slug }
  
    const page = await client.fetch(query, params)
    return page as PageType
  }

export default async function Page({ params }: { params: { slug: string }}) {
    const { slug } = params
    const page = await getPageBySlug(slug)

    return (
        <>
            <Section
                data={page?.hero as unknown as SectionType}
                hero
                className="hero-compact"
            />
            {(page?.sections as unknown as SectionType[])?.map((section, idx) => (
               <Section key={idx} data={section} /> 
            ))}
        </>
    );
}
