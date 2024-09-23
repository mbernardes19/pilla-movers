'use client'

import { createContext, Dispatch, FC, ReactElement, SetStateAction, useContext, useState } from "react";
import { ImageAsset } from "sanity";
import { BlockContent } from "../../sanity.types";
import { Lead } from "@/utils/types";

export type Step = {
    id?: number;
    question?: Array<BlockContent>;
    options?: Array<{
      icon?: {
        asset: ImageAsset
      }
      label?: string;
    }>;
}

type FormContext = {
    steps: Step[]
    currentStepId: number
    setStepId: Dispatch<SetStateAction<number>>
    currentStep: Step
    answer: (data: string) => void
    submitAnswers: () => void
    getLead: () => Lead
}

export const FormContext = createContext<FormContext>({
    steps: [], currentStepId: 0, setStepId: () => '',
    currentStep: {
        id: undefined,
        question: undefined,
        options: undefined
    },
    answer: () => '',
    submitAnswers: () => '',
    getLead: () => ({
        from: '',
        to: '',
        venue_from: '',
        venue_to: '',
        bedrooms: '',
        people: '',
        items: '',
        storage_size: '',
        moveType: '',
        date: '',
        user_name: '',
        user_email: '',
        user_phone: ''
    })
})

export type FormProviderProps = {
    children?: ReactElement
    steps: Step[]
}

const stepsMap = (answers: Record<number, string>): Record<number, number | (()=>number)> => ({
    1: 2,
    2: () => {
        switch (answers[1]) {
            case 'office':
                return 4
            case 'business':
                return 5
            case 'storage':
                return 6
            default:
                return 3
        }
    },
    3: 7,
    4: 7,
    5: 7,
    6: 7,
    7: 8,
    8: 9
})

export const FormProvider: FC<FormProviderProps> = ({ children, steps }) => {
    const [id, setId] = useState(1)
    const currentStep = steps.find(step => step.id === id)!
    const [answers, setAnswer] = useState<Record<number, string>>({})
    const getNextId = (id: number) => {
        const nextId = stepsMap(answers)[id]
        return typeof nextId === 'number' ? nextId : nextId()
    }

    const saveAnswer = (answer: string) => {
        setAnswer({...answers, [id]: answer.toLowerCase().replaceAll(' ', '-')})
    }

    const value: FormContext = {
        steps,
        currentStepId: id,
        setStepId: setId,
        currentStep,
        answer: (data: string) => {
            saveAnswer(data)
            setId(getNextId(id))
        },
        submitAnswers: () => {},
        getLead: () => ({
            from: JSON.parse(answers[0]).from,
            to: JSON.parse(answers[0]).to,
            venue_from: answers[1],
            venue_to: answers[2],
            bedrooms: answers[3],
            people: answers[4],
            items: answers[5],
            storage_size: answers[6],
            moveType: answers[7],
            date: answers[8],
            user_name: JSON.parse(answers[0]).name,
            user_email: JSON.parse(answers[0]).email,
            user_phone: JSON.parse(answers[0]).phone,
        })
    }

    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    )
}

export const useForm = () => {
    return useContext(FormContext)
}