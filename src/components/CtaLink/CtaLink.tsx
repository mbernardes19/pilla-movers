import { FC } from "react"
import { Cta } from "../../../sanity.types"
import s from './CtaLink.module.scss'

export type CtaLinkProps = Cta

export const CtaLink: FC<CtaLinkProps> = ({ link, icon, iconOnly, text }) => {
    // @ts-expect-error Test
    const { asset: { url } } = icon
    return (
        <a className={s['link']} href={link}>
            <img src={url} alt="" />
            {!iconOnly ? <span>{text}</span> : null}
        </a>
    )
}