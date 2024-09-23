import { PortableText } from 'next-sanity'
import { Section as SectionType } from '../../../sanity.types'

export type SectionProps = {
    data: SectionType
}

export const Section = ({ data }: SectionProps) => {
    const { title, headline, subheadline, content, ctas } = data
    return (
        <article>
            {title ? <h2>{title}</h2> : <h2>{headline}</h2>}
            <h3>{subheadline}</h3>
            {content?.content_blocks?.map((content, idx) => (
                // @ts-expect-error Test
                <PortableText key={idx} value={content?.content} />
            ))}
            {ctas?.map((cta, idx) => (
                // @ts-expect-error Test
                <a key={idx} href={cta.link}>{cta.icon && cta.icon}{cta.text}</a>
            ))}
        </article>
    )
}