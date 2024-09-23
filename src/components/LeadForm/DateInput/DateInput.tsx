/* eslint-disable @next/next/no-img-element */

import { useForm } from "@/hooks/useForm"
import { useState } from "react"

export const DateInput = () => {
    const { answer } = useForm()
    const [date, setDate] = useState('')

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                answer(date)
            }}>
                <input
                    type="date"
                    onChange={(data) => {
                        console.log(data)
                        setDate(data.target.value)
                    }}
                />
                <input type="submit" />
            </form>
        </>
    )
}