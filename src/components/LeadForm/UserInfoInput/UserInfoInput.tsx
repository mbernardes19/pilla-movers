'use client'

/* eslint-disable @next/next/no-img-element */
import { submitLead } from "@/app/submitLead"
import { useForm } from "@/hooks/useForm"
import { useState } from "react"

export const UserInfoInput = () => {
    const { answer, getLead, setStepId } = useForm()
    const [data, setData] = useState({name: '', phone: '', email: ''})

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault()
                answer(JSON.stringify(data))
                try {
                    await submitLead(JSON.parse(JSON.stringify(getLead())))
                    setStepId(10)
                } catch (err) {
                    console.error(err)
                }
            }}>
                <input placeholder="Name" type="text" onChange={(e) => setData({...data, name: e.target.value})} />
                <input placeholder="Phone number" type="tel" onChange={(e) => setData({...data, phone: e.target.value})} />
                <input placeholder="Email" type="email" onChange={(e) => setData({...data, email: e.target.value})} />
                <input type="submit" />
            </form>
        </>
    )
}