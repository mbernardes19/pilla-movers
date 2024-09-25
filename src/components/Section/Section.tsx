'use client'

import { PortableText } from 'next-sanity'
import { Section as SectionType } from '../../../sanity.types'
import s from './Section.module.scss'
import cn from 'classnames'

export type SectionProps = {
    data: SectionType
    children?: JSX.Element
    id?: string
    hero?: boolean
    className?: string
}

export const Section = ({ id, data, className, hero, children }: SectionProps) => {
    const { headline, subheadline, content, ctas, video_background } = data
    return (
        <section
            {...(id ? { id } : { })}
            className={cn([s[className || '']], s['section'])}
        >
            {video_background && (
                <>
                    <div className={s['video-overlay']} />
                    <video className={s['video-background']} autoPlay loop muted>
                        {/* @ts-expect-error Test */}
                        <source src={video_background.asset?.url} />
                    </video>
                </>
            )
                }
            {hero ? (
                <>
                    <h1>{headline}</h1>
                    <h2>{subheadline}</h2>    
                </>
            ): (
                <>
                    <h2>{headline}</h2>
                    <h3>{subheadline}</h3>    
                </>
            )}
            {content?.content_blocks?.map((content, idx) => (
                // @ts-expect-error Test
                <PortableText key={idx} value={content?.content} />
            ))}
            {children}
            {ctas?.map((cta, idx) => (
                // @ts-expect-error Test
                <a key={idx} href={cta.link}>{cta.icon && cta.icon}{cta.text}</a>
            ))}
        </section>
    )
}