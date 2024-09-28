import { useEffect, useState } from "react";
import s from './Autocomplete.module.scss'
import cn from 'classnames'

export interface AddressAutofillSuggestion {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    address_level1?: string;
    address_level2?: string;
    address_level3?: string;
}

export type AutocompleteProps = {
    suggestions: AddressAutofillSuggestion[]
    onSelect: (address: string) => void
}

export const Autocomplete = ({ suggestions, onSelect }: AutocompleteProps) => {
    const [isClosed, setIsClosed] = useState(false)

    useEffect(() => {
        setIsClosed(false)
    }, [suggestions])

    if (isClosed) {
        return <></>
    }
    
    return (
        <ul className={cn([
            s['autocomplete'],
            {
                block: suggestions.length,
                hidden: !suggestions.length
            }
        ])}>
            {suggestions.map((suggestion, key) => {
                const address = `${suggestion.address_line1}${ suggestion.address_line2}${ suggestion.address_line3}, ${suggestion.address_level3}, ${suggestion.address_level2}, ${suggestion.address_level1}`
                return (
                    <li key={key}>
                        <button onClick={() => {
                            onSelect(address)
                            setIsClosed(true)
                        }}>
                            {address}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}