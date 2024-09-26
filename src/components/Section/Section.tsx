'use client'

import { PortableText } from 'next-sanity'
import { Cta, Section as SectionType } from '../../../sanity.types'
import s from './Section.module.scss'
import cn from 'classnames'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                    <video className={s['video-background']} autoPlay loop muted playsInline>
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
            {content?.render_as === 'text' && (
                <div className={s['text-blocks']}>
                    {content?.content_blocks?.map((content, idx) => (
                        <div key={idx} className={s['text']}>
                            <div className={s['content']}>
                                {/* @ts-expect-error Tes */}
                                <PortableText key={idx} value={content?.content} />
                            </div>
                        </div>
                    ))}
                </div>                
            )}
            {content?.render_as === 'cards' && (
                <div className={s['cards']}>
                    {content?.content_blocks?.map((content, idx) => (
                        <div key={idx} className={s['card']}>
                            <div className={s['content']}>
                                {/* @ts-expect-error Tes */}
                                <PortableText key={idx} value={content?.content} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {content?.render_as === 'slider' && (
                <Slider
                    className={s['slider']}
                    slidesToShow={1}
                    slidesToScroll={1}
                    swipeToSlide
                    arrows={false}
                    autoplay
                    autoplaySpeed={2000}
                    speed={500}
                    dots={true}
                >
                    {content?.content_blocks?.map((content, idx) => (
                        <div key={idx} className={cn([s['slide'], s['card']])}>
                            <div className={s['slide-inner']}>
                                <div className={s['content']}>
                                    {/* @ts-expect-error Test */}
                                    <PortableText key={idx} value={content?.content} />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
            {children}
            {ctas && (
                <div className={s['ctas']}>
                    {ctas?.map((sectionCta, idx) => {
                        const cta = sectionCta as unknown as Cta
                        {/* @ts-expect-error Test */}
                        return <a role="button" key={idx} href={cta.link} className={cta.type}>{cta.icon && cta.icon}{cta.text}</a>
                    })}
                </div>
            )}
        </section>
    )
}