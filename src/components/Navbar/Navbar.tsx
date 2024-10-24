'use client'

import { usePathname } from 'next/navigation';
/* eslint-disable @next/next/no-img-element */
import s from './Navbar.module.scss';
import { Page } from '../../../sanity.types';
import { useState } from 'react';
import cn from 'classnames'

export type NavbarProps = {
    pages: Page[]
}

const processLinks = (link: string) => {
    return link === 'home' ? '/' : `/${link}`
}

export const Navbar = ({ pages }: NavbarProps) => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    if (pathname.includes('/studio')) {
        return null
    }

    return (
        <nav className={s.container}>
            <a href="/">
                <img src="/pilla-movers-2.webp" alt="" />
            </a>
            <ul>
                {pages?.map(((page, idx) => (
                    <li key={idx}><a href={processLinks(page.slug?.current ?? '')}>{page.title}</a></li>
                )))}
            </ul>
            <button
                className={cn([
                    s['mobile-nav'],
                    {
                        [s.activeMenu]: isOpen
                    }
                ])}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div />
                <div />
                <div />
            </button>
            <div className={cn([
                "w-full h-screen absolute overflow-x-hidden",
                {
                    'invisible': !isOpen
                }
            ])}>
                <div className={cn([
                    'bg-[#1748FF] z-10 w-[45%] h-screen absolute translate-x-[100%] transition-[all] right-0 duration-150',
                    {
                        [s.active]: isOpen
                    },
                    s['mobile-menu']
                ])}>
                    <ul>
                        {pages?.map(((page, idx) => (
                            <li key={idx}><a href={processLinks(page.slug?.current ?? '')}>{page.title}</a></li>
                        )))}
                    </ul>
                </div>
                <div className={cn([
                    "absolute w-full z-0 transition-all duration-150 h-screen bg-black/50",
                    {
                        'opacity-0': !isOpen
                    }
                ])} onClick={() => setIsOpen(false)}></div>
            </div>
            <div className={s['background']}/>
        </nav>
    )
}