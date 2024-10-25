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
import { WhatsappIcon } from "../icons/Whatsapp";
import { MapPin } from "../icons/Pin";

const isDebug = process.env.NEXT_PUBLIC_DEBUG === 'true'

export const SkeletonLoader = () => (
    <div style={{width: '100%'}}>
        <Skeleton width="100%" height={56.25} style={{marginBottom: 12}} />
        <Skeleton width="100%" height={56.25} style={{marginBottom: 12}} />
        <Skeleton width={260} height={56} style={{marginBottom: 12}} />
        <Skeleton width={260} height={56} style={{marginBottom: 12}} />
    </div>
)

export type AddressFormProps = {
    ctas: {link: string}[]
}

export const AddressForm = ({ ctas }: AddressFormProps) => {
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
        setAddressFrom(event?.target.value)
        if (!isDebug) debounceOnChange({address: event?.target.value, type:'from'}, suggest)
    }

    const handleAddressToChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddressTo(event.target.value)
        if (!isDebug) debounceOnChange({address: event?.target.value, type:'to'}, suggest)
    }

    return (
        <div className={s['container']}>
            <div className="flex flex-col gap-y-4 mb-4">
                <div className="relative">
                    <MapPin className="absolute ml-2 top-1/2 translate-y-[-50%]" width="30px" />
                    <input placeholder="From" value={addressFrom} onChange={handleAddressFromChange} />
                </div>
                <Autocomplete
                    suggestions={suggestionsFrom}
                    onSelect={(address) => {
                        setAddressFrom(address)
                    }}
                />
                <div className="relative">
                    <MapPin className="absolute ml-2 top-1/2 translate-y-[-50%]" width="30px" />
                    <input placeholder="To" value={addressTo} onChange={handleAddressToChange} />
                </div>
                <Autocomplete
                    suggestions={suggestionsTo}
                    onSelect={(address) => {
                        setAddressTo(address)
                    }}
                />
            </div>
            <div className={s['ctas']}>
                <button onClick={saveAddresses}>GET A FREE QUOTE NOW</button>
                <button
                    className="flex justify-center items-center secondary w-full"
                    onClick={() => push(ctas?.[0]?.link ?? '')}
                >
                    <WhatsappIcon width="32px"/>
                    <span className="ml-2">Message Us Now</span>
                </button>
            </div>
        </div>
    )
}

export default AddressForm