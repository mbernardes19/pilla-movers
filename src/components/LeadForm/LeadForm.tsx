/* eslint-disable @next/next/no-img-element */
'use client'

import { FormProvider, Step, useForm } from "@/hooks/useForm"
import { ComponentType } from "react"
import { MultipleOptions } from "./MultipleOptions/MultipleOptions"
import { DateInput } from "./DateInput/DateInput"
import { UserInfoInput } from "./UserInfoInput/UserInfoInput"
import { PortableText } from "next-sanity"
import { SuccessScreen } from "./SuccessScreen/SuccessScreen"
import s from './LeadForm.module.scss'

const componentMap: Record<number, ComponentType> = {
    1: MultipleOptions,
    2: MultipleOptions,
    3: MultipleOptions,
    4: MultipleOptions,
    5: MultipleOptions,
    6: MultipleOptions,
    7: MultipleOptions,
    8: DateInput,
    9: UserInfoInput,
    10: SuccessScreen
}

const LeadFormComponent = () => {
    const { currentStepId, currentStep } = useForm()
    const CurrentStep = componentMap[currentStepId]
    return (
        <div className={s['form-container']}>
            {/* @ts-expect-error Test */}
            <PortableText value={currentStep.question!} />
            <CurrentStep />
        </div>
    )
}

export const LeadForm = ({ steps }: { steps: Step[] }) => (
    <FormProvider steps={steps}>
        <LeadFormComponent />
    </FormProvider>
)