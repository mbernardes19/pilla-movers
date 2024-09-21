/* eslint-disable @next/next/no-img-element */
'use client'

import { FormProvider, Step, useForm } from "@/hooks/useForm"

const LeadFormComponent = () => {
    const { currentStep, answer } = useForm()
    console.log('=== steps lead form', currentStep)
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

export const LeadForm = ({ steps }: { steps: Step[] }) => (
    <FormProvider steps={steps}>
        <LeadFormComponent />
    </FormProvider>
)