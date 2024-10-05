/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useAddressAutofillCore } from "@mapbox/search-js-react"
import _ from 'lodash';
import { AddressAutofillSuggestion, Autocomplete } from "../Autocomplete/Autocomplete";
import { setSession } from "@/utils/session";
import { getMapboxToken } from "@/app/getMapboxToken";
import s from './AddressForm.module.scss';
import { from, to } from "../../../test/addresses";
import Skeleton from 'react-loading-skeleton'

const isDebug = process.env.NEXT_PUBLIC_DEBUG === 'true'

export const SkeletonLoader = () => (
    <div style={{width: '100%'}}>
        <Skeleton width="100%" height={56.25} style={{marginBottom: 12}} />
        <Skeleton width="100%" height={56.25} style={{marginBottom: 12}} />
        <Skeleton width={260} height={56} style={{marginBottom: 12}} />
        <Skeleton width={260} height={56} style={{marginBottom: 12}} />
    </div>
)

export const AddressForm = () => {
    const { push } = useRouter()
    const [addressFrom, setAddressFrom] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const [mapboxId, setMapboxId] = useState('')
    const autofill = useAddressAutofillCore({ accessToken: mapboxId })
    const [suggestionsFrom, setSuggestionsFrom] = useState<AddressAutofillSuggestion[]>(isDebug ? from: [])
    const [suggestionsTo, setSuggestionsTo] = useState<AddressAutofillSuggestion[]>(isDebug ? to : [])

    useEffect(() => {
        setSession()
        const fetchMapboxId = async () => {
            const token = await getMapboxToken()
            setMapboxId(token)
        }
        fetchMapboxId()
    }, [])

    const suggest = async ({ address, type }:{address: string, type: 'from' | 'to'}) => {
        if (!address) {
            if (type === 'from') {
                setSuggestionsFrom([])
            }
            if (type === 'to') {
                setSuggestionsFrom([])
            }
            return
        }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceOnChange = useCallback(
        _.debounce((value, callback) => {
            callback(value)
        }, 500), [])

    const handleAddressFromChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('=== event?.target.value', event?.target.value)
        setAddressFrom(event?.target.value)
        if (!isDebug) debounceOnChange({address: event?.target.value, type:'from'}, suggest)
    }

    const handleAddressToChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddressTo(event.target.value)
        if (!isDebug) debounceOnChange({address: event?.target.value, type:'to'}, suggest)
    }

    useEffect(() => {
        console.log(suggestionsFrom, suggestionsTo)
    }, [suggestionsFrom, suggestionsTo])

    return (
        <div className={s['container']}>
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
            <div className={s['ctas']}>
                <button onClick={saveAddresses}>GET A FREE QUOTE NOW</button>
                <button className="secondary">Message Us Now</button>
            </div>
        </div>
    )
}

export default AddressForm