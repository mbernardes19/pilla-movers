'use client'

/* eslint-disable @next/next/no-img-element */
import { PortableText } from 'next-sanity'
import s from './Footer.module.scss'
import { usePathname } from 'next/navigation';
import { CtaLink } from '../CtaLink/CtaLink';


// @ts-expect-error Test
export const Footer = ({ data }) => {
    const pathname = usePathname()

    if (pathname.includes('/studio')) {
        return null
    }

    return (
        <footer className={s['container']}>
            <div className={s['logo']}>
                <img src={data.logo.asset.url} />
            </div>
            <div className={s['page-links']}>
                <h4>Quick links</h4>
                <ul>
                    {/* @ts-expect-error Test */}
                    {data?.pages?.map(((page, idx) => (
                        <li key={idx}><a href={`/${page.slug?.current}`}>{page.title}</a></li>
                    )))}
                </ul>
            </div>
            {/* @ts-expect-error Test */}
            {data.content_blocks.map((content, idx) => (
                <div key={idx} className={s['info']}>
                    <PortableText
                        components={{
                            types: {
                                image: ({ value }) => {
                                    return (
                                        <img src={value.asset.url} alt=""/>
                                    )
                                }
                            },
                            marks: {
                                ctaLink: ({ value }) => <CtaLink {...value.cta} />
                            }
                        }}
                        value={content.content}
                    />
                </div>
            ))}
        </footer>
    )
}