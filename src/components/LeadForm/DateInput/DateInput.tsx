/* eslint-disable @next/next/no-img-element */
import { useForm } from "@/hooks/useForm"

export const DateInput = () => {
    const { currentStep, answer } = useForm()

    return (
        <>
            <form onSubmit={(e, data) => {
                e.preventDefault()
                console.log('data', e, data)
            }}>
                <input type="date" onChange={(data) => console.log(data)} onSubmit={(e) => console.log(e)} />
                <input type="submit" />
            </form>
        </>
    )
}