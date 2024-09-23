/* eslint-disable @next/next/no-img-element */
import { submitLead } from "@/app/submitLead"
import { useForm } from "@/hooks/useForm"

export const UserInfoInput = () => {
    const { getLead } = useForm()

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                submitLead(getLead())
            }}>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="submit" />
            </form>
        </>
    )
}