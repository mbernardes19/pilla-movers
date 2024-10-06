'use client'

/* eslint-disable @next/next/no-img-element */
import { submitLead } from "@/app/submitLead"
import { useForm } from "@/hooks/useForm"
import { useEffect, useState } from "react"
import { unformat, useMask } from "@react-input/mask"

export const UserInfoInput = () => {
    const { answer, getLead, setStepId } = useForm()
    const [data, setData] = useState({name: '', phone: '', email: ''})
    const [loading, setLoading] = useState(false)
    const [isPhoneInputValid, setIsPhoneInputValid] = useState(false)
    const maskFormat = {
        mask: '(___) ___-____',
        replacement: { '_': /\d/ },
        // @ts-expect-error Test
        onMask: (ev) => setIsPhoneInputValid(ev.detail.isValid)
    }
    const phoneInputRef = useMask(maskFormat)

    useEffect(() => {
        if (!isPhoneInputValid) {
            phoneInputRef.current?.setCustomValidity('Please provide a valid 10-digit phone number')
        } else {
            phoneInputRef.current?.setCustomValidity('')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPhoneInputValid])

    return (
        <>
            <form onSubmit={async (e) => {
                setLoading(true)
                e.preventDefault()
                phoneInputRef.current?.reportValidity()
                const answers = answer(JSON.stringify(data))
                try {
                    await submitLead(JSON.parse(JSON.stringify(getLead(answers))))
                    setStepId(10)
                } catch (err) {
                    console.error(err)
                }
                setLoading(false)
            }}>
                <input
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setData({...data, name: e.target.value})}
                    required
                />
                <input
                    placeholder="Phone number"
                    ref={phoneInputRef} 
                    type="tel"
                    onChange={(e) => setData({...data, phone: unformat(e.target.value, maskFormat)})}
                    required
                />
                <input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setData({...data, email: e.target.value})}
                    required
                />
                {!loading ? <input type="submit" /> : <button className="w-full mb-4" aria-busy="true">Submit</button>}
            </form>
        </>
    )
}