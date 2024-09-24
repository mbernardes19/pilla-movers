/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useAddressAutofillCore } from "@mapbox/search-js-react"
import _ from 'lodash';
import { Autocomplete } from "../Autocomplete/Autocomplete";

const setSession = () => {
    if (typeof window !== 'undefined') {
        if (!localStorage.getItem('session')) {
            const uuid = crypto.randomUUID()
            localStorage.setItem('session', uuid)
        }
    }
}

export const AddressForm = () => {
    const { push } = useRouter()
    const [addressFrom, setAddressFrom] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const autofill = useAddressAutofillCore({ accessToken: process.env.MAPBOX_TOKEN! })
    const [suggestionsFrom, setSuggestionsFrom] = useState<any[]>([])
    const [suggestionsTo, setSuggestionsTo] = useState<any[]>([])

    setSession()

    const suggest = async ({ address, type }:{address: string, type: 'from' | 'to'}) => {
        const response = await autofill.suggest(address, {
            sessionToken: localStorage.getItem('session') || '',
            country: 'us',
            language: 'en',
            proximity: {
                lat: 40.730610,
                lng: -73.935242
            }
        })
        if (type === 'from') {
            setSuggestionsFrom(response.suggestions)
        } else {
            setSuggestionsTo(response.suggestions)
        }
        
    }

    const saveAddresses = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('address_from', addressFrom)
            sessionStorage.setItem('address_to', addressTo)
            push('/get-a-quote')
        }
    }

    const debounceOnChange = useCallback(
        _.debounce((value, callback) => {
            callback(value)
        }, 1000), [])

    const handleAddressFromChange = (event: any) => {
        setAddressFrom(event.target.value)
        debounceOnChange({address: addressFrom, type:'from'}, suggest)
    }

    const handleAddressToChange = (event: any) => {
        setAddressTo(event.target.value)
        debounceOnChange({address: addressTo, type:'to'}, suggest)
    }

    useEffect(() => {
        console.log(suggestionsFrom, suggestionsTo)
    }, [suggestionsFrom, suggestionsTo])

    return (
        <>
            <input placeholder="From" value={addressFrom} onChange={handleAddressFromChange} />
            <Autocomplete
                suggestions={suggestionsFrom}
                onSelect={(address) => {
                    setAddressFrom(address)
                }}
            />
            <input placeholder="To" value={addressTo} onChange={handleAddressToChange} />
            <Autocomplete
                suggestions={suggestionsTo}
                onSelect={(address) => {
                    setAddressTo(address)
                }}
            />
            <button onClick={saveAddresses}>GET A FREE QUOTE NOW</button>
        </>
    )
}