/* eslint-disable @next/next/no-img-element */

import { useForm } from "@/hooks/useForm"
import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateInput = () => {
    const { answer } = useForm()
    const [date, setDate] = useState(new Date())

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                answer(date.toISOString().split('T')[0])
            }}>
                <DatePicker selected={date} minDate={new Date()} onChange={newDate => setDate(newDate!)} />
                <input type="submit" />
            </form>
        </>
    )
}