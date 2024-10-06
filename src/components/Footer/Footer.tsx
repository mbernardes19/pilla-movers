/* eslint-disable @next/next/no-img-element */
import { PortableText } from 'next-sanity'
import s from './Footer.module.scss'

// @ts-expect-error Test
export const Footer = ({ data }) => {
    return (
        <footer className={s['container']}>
            <div>
                <img src="/pilla-movers-2.webp" alt="" />
            </div>
            <div>
                <ul>
                    {/* @ts-expect-error Test */}
                    {data?.pages?.map(((page, idx) => (
                        <li key={idx}><a href={`/${page.slug?.current}`}>{page.title}</a></li>
                    )))}
                </ul>
            </div>
            {/* @ts-expect-error Test */}
            {data.content_blocks.map((content, idx) => (
                    <div key={idx}>
                        <PortableText value={content.content} />
                    </div>
            ))}
        </footer>
    )
}