import { PortableText } from 'next-sanity'
import { Section as SectionType } from '../../../sanity.types'

export type HeroProps = {
    data: SectionType
    children: JSX.Element
}

export const Hero = ({ data, children }: HeroProps) => {
    const { headline, subheadline, content } = data
    return (
        <article>
            <h1>{headline}</h1>
            <h3>{subheadline}</h3>
            {content?.content_blocks?.map((content, idx) => (
                <PortableText key={idx} value={content?.content} />
            ))}
            {children}
        </article>
    )
}