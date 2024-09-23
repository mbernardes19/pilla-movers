import { Hero } from "@/components/Hero/Hero";
import { AddressForm } from "@/components/LeadForm/AddressForm";
import { Section } from "@/components/Section/Section";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { Section as SectionType } from "../../sanity.types";

async function getPageBySlug(slug: string) {
    const query3 = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
        title,
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
            ctas[]{
                text,
                link,
                icon
            }
        }
    }`)
    const query31 = await client.fetch(query3, { slug })
    return query31
}

export default async function Home() {
    const pageData = await getPageBySlug('home')
    return (
        <>
            <Hero data={pageData?.sections?.[0] as SectionType}>
                <AddressForm />
            </Hero>
            {/*// @ts-expect-error Test */}
            {pageData?.sections?.map((section: SectionType, idx) => (
                <Section key={idx} data={section} />
            ))}
        </>
    );
}
