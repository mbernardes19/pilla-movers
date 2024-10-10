import { Section } from "@/components/Section/Section";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { Section as SectionType } from "../../sanity.types";
import dynamic from "next/dynamic";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton";

const AddressFormNoSSR = dynamic(
    () => import("@/components/LeadForm/AddressForm"),
    { ssr: false, loading: () =>
        <div style={{width: '100%', maxWidth: '960px'}}>
            <Skeleton width="100%" height={56.25} style={{marginBottom: 12}} />
            <Skeleton width="100%" height={56.25} style={{marginBottom: 12}} />
            <Skeleton width={260} height={56} style={{marginBottom: 12}} />
            <Skeleton width={260} height={56} style={{marginBottom: 12}} />
        </div> }
)

async function getPageBySlug(slug: string) {
    const query3 = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
        title,
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
            mainImage {
                asset->{
                    url
                }
            },
            ctas[]->{
                text,
                link,
                icon,
                type
            },
            background_color
        }
    }`)
    const query31 = await client.fetch(query3, { slug })
    return query31
}

export default async function Home() {
    const pageData = await getPageBySlug('home')
    return (
        <>
            <Section
                id="form"
                data={pageData?.hero as unknown as SectionType}
                hero
                className="hero"
            >
                <AddressFormNoSSR />
            </Section>
            {/*// @ts-expect-error Test */}
            {pageData?.sections?.map((section: SectionType, idx) => (
                <Section key={idx} data={section} />
            ))}
        </>
    );
}
