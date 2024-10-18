'use client'

/* eslint-disable @next/next/no-img-element */
import { PortableText } from 'next-sanity'
import s from './Footer.module.scss'
import { usePathname } from 'next/navigation';


// @ts-expect-error Test
export const Footer = ({ data }) => {
    const pathname = usePathname()

    if (pathname.includes('/studio')) {
        return null
    }

    return (
        <footer className={s['container']}>
            <div className={s['page-links']}>
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
                            marks: {
                                internalLink: ({ value }) => {
                                    const { cta: { link, icon: { asset: { url }} } } = value
                                    return (
                                        <a href={link}>
                                            <img src={url} alt="" />
                                        </a>
                                    )
                            }
                            }
                        }}
                        value={content.content}
                    />
                </div>
            ))}
        </footer>
    )
}