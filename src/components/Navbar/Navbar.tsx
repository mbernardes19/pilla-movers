/* eslint-disable @next/next/no-img-element */
import s from './Navbar.module.scss';

export const Navbar = () => {
    return (
        <nav className={s.container}>
            <img src="/pilla-movers-2.png" alt="" />
            <ul>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
            </ul>

            <button className={s['mobile-nav']}>
                <div />
                <div />
                <div />
            </button>
            <div className={s['background']}/>
        </nav>
    )
}