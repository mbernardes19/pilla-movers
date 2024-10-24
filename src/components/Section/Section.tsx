/* eslint-disable @next/next/no-img-element */
'use client'

import { PortableText } from 'next-sanity'
import { Cta, Section as SectionType } from '../../../sanity.types'
import s from './Section.module.scss'
import cn from 'classnames'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import urlBuilder from '@sanity/image-url'

export type SectionProps = {
    data: SectionType
    children?: JSX.Element
    id?: string
    hero?: boolean
    className?: string
}

export const Section = ({ id, data, className, hero, children }: SectionProps) => {
    const { headline, subheadline, content, ctas, video_background, background_color, mainImage } = data

    return (
        <section
            {...(id ? { id } : { })}
            className={cn([
                [s[className || '']],
                s['section'],
                {
                    [s['bg-primary']]: background_color === 'primary',
                    [s['bg-secondary']]: background_color === 'secondary'
                }
            ])}
        >
            {video_background && (
                <>
                    <div className={s['video-overlay']} />
                    <video className={s['video-background']} autoPlay loop muted playsInline>
                        {/* @ts-expect-error Test */}
                        <source src={video_background.asset?.url} />
                    </video>
                </>
            )}
            {mainImage && (
                <>
                <div className={cn(s['image-overlay'])} />
                <div
                    style={{
                        // @ts-expect-error Test
                        backgroundImage: `url(${mainImage.asset.url})`
                    }}
                    className={`bg-cover bg-top w-full h-full absolute z-[-2] left-0 top-0 opacity-30`}
                />
                </>
            )}
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
                                <PortableText key={idx} value={content?.content} components={{
                                    types: {
                                        image: ({value}) => {
                                            const imageUrl = urlBuilder({
                                                projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
                                                dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!
                                            }).image(value).format('png').url()
                                            return <img src={imageUrl} className="w-full h-full mb-4" alt=""/>
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {content?.render_as === 'slider' && (
                <Slider
                    className={s['slider']}
                    slidesToShow={4}
                    slidesToScroll={1}
                    swipeToSlide
                    arrows={false}
                    autoplay
                    autoplaySpeed={3000}
                    speed={500}
                    dots={true}
                    pauseOnHover={false}
                    responsive={[
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        },
                        {
                            breakpoint: 970,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 1600,
                            settings: {
                                slidesToShow: 3
                            }
                        }
                    ]}
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
            {content?.render_as === 'testimonials' && (
                <div className={s['testimonials']}>
                    {content?.content_blocks?.map((content, idx) => (
                        <div key={idx} className={s['testimonial']}>
                            <div className={s['content']}>
                                {/* @ts-expect-error Tes */}
                                <PortableText key={idx} value={content?.content} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {children}
            {ctas && !hero && (
                <div className={s['ctas']}>
                    {ctas?.map((sectionCta, idx) => {
                        const cta = sectionCta as unknown as Cta
                        return (
                        <a
                            role="button"
                            key={idx}
                            href={cta.link}
                            className={background_color === 'secondary' && cta.type === 'secondary' ? `secondary ${s['secondary-2']}` : cta.type }
                            >
                                {cta.text}
                            </a>
                        )
                    })}
                </div>
            )}
        </section>
    )
}