/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useAddressAutofillCore } from "@mapbox/search-js-react"
import _ from 'lodash';
import { AddressAutofillSuggestion, Autocomplete } from "../Autocomplete/Autocomplete";
import { setSession } from "@/utils/session";

export const AddressForm = () => {
    const { push } = useRouter()
    const [addressFrom, setAddressFrom] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const autofill = useAddressAutofillCore({ accessToken: process.env.MAPBOX_TOKEN! })
    const [suggestionsFrom, setSuggestionsFrom] = useState<AddressAutofillSuggestion[]>([])
    const [suggestionsTo, setSuggestionsTo] = useState<AddressAutofillSuggestion[]>([])

    useEffect(() => {
        setSession()
    }, [])

    const suggest = async ({ address, type }:{address: string, type: 'from' | 'to'}) => {
        console.log('=== window', typeof window)
        if (typeof window !== 'undefined') {
            const response = await autofill.suggest(address, {
                // sessionToken: localStorage.getItem('session') || '',
                sessionToken: '',
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

    const handleAddressFromChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddressFrom(event?.target.value)
        debounceOnChange({address: addressFrom, type:'from'}, suggest)
    }

    const handleAddressToChange = (event: ChangeEvent<HTMLInputElement>) => {
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

export default AddressForm