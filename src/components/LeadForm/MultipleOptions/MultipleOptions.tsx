/* eslint-disable @next/next/no-img-element */
import { useForm } from "@/hooks/useForm"

export const MultipleOptions = () => {
    const { currentStep, answer } = useForm()
    return (
        <>
            {currentStep.options?.map(((option, idx) => (
                <button key={idx} className="bg-blue inline-block p-3" onClick={() => answer(option.label!)}>
                    <img src={option.icon?.asset.url} className="w-[60px] h-[60px]" alt="" />
                    <span>{option.label}</span>
                </button>
            )))}
        </>
    )
}