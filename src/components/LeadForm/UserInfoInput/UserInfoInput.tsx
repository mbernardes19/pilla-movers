'use client'

/* eslint-disable @next/next/no-img-element */
import { submitLead } from "@/app/submitLead"
import { useForm } from "@/hooks/useForm"
import { useEffect, useState } from "react"

export const UserInfoInput = () => {
    const { answer, getLead, setStepId } = useForm()
    const [data, setData] = useState({name: '', phone: '', email: ''})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log('=== loading', loading)
    }, [loading])

    return (
        <>
            <form onSubmit={async (e) => {
                setLoading(true)
                e.preventDefault()
                answer(JSON.stringify(data))
                try {
                    // await submitLead(JSON.parse(JSON.stringify(getLead())))
                    setTimeout(() => setLoading(false), 2000)
                    // setStepId(10)
                } catch (err) {
                    console.error(err)
                }
                // setLoading(false)
            }}>
                <input placeholder="Name" type="text" onChange={(e) => setData({...data, name: e.target.value})} />
                <input placeholder="Phone number" type="tel" onChange={(e) => setData({...data, phone: e.target.value})} />
                <input placeholder="Email" type="email" onChange={(e) => setData({...data, email: e.target.value})} />
                {!loading ? <input type="submit" /> : <button className="w-full mb-4" aria-busy="true">Submit</button>}
            </form>
        </>
    )
}