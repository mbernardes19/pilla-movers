import { useEffect, useState } from "react";

export interface AddressAutofillSuggestion {
    accuracy?: string;
    original_search_text: string;
    feature_name: string;
    matching_name: string;
    description: string;
    maki?: string;
    language: string;
    address?: string;
    full_address?: string;
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    address_level1?: string;
    address_level2?: string;
    address_level3?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
    metadata: {
        iso_3166_1: string;
    };
    place_name?: string;
    place_type: string[];
    action: {
        id: string;
    };
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
        <ul className={suggestions.length ? 'block' : 'hidden'}>
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