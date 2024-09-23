/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"


export const AddressForm = () => {
    const { push } = useRouter()
    const [address, setAddress] = useState({from: '', to: ''})

    const saveAddresses = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('address_from', address.from)
            sessionStorage.setItem('address_to', address.to)
            push('/get-a-quote')
        }
    }

    return (
        <>
            <input placeholder="From" onChange={(e) => setAddress({...address, from: e.target.value})} />
            <input placeholder="To" onChange={(e) => setAddress({...address, to: e.target.value})} />
            <button onClick={saveAddresses}>GET A FREE QUOTE NOW</button>
        </>
    )
}