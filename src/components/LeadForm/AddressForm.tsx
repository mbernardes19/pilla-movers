/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation"


export const AddressForm = () => {
    const { push } = useRouter()

    const saveAddresses = () => {
        // sessionStorage.setItem()
        push('/get-a-quote')
    }

    return (
        <>
            <input placeholder="From" />
            <input placeholder="To" />
            <button onClick={saveAddresses}>GET A FREE QUOTE NOW</button>
        </>
    )
}