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
    answer: (data: string) => Record<string,string>
    submitAnswers: () => void
    getLead: (answers?: Record<number, string>) => Lead
}

export const FormContext = createContext<FormContext>({
    steps: [], currentStepId: 0, setStepId: () => '',
    currentStep: {
        id: undefined,
        question: undefined,
        options: undefined
    },
    answer: (data: string) => {
        return {
            key: data
        }
    },
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
        move_type: '',
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
            case 'Office':
                return 4
            case 'Business':
                return 5
            case 'Storage':
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
    const initialAddress = typeof window !== 'undefined' ? {from: sessionStorage.getItem('address_from'), to: sessionStorage.getItem('address_to')} : {}
    const [answers, setAnswer] = useState<Record<number, string>>({
        0: JSON.stringify(initialAddress)
    })
    const getNextId = (id: number) => {
        const nextId = stepsMap(answers)[id]
        return typeof nextId === 'number' ? nextId : nextId()
    }

    const saveAnswer = (answer: string) => {
        console.log('=== save answer', answer)
        console.log('=== save answer id', id)
        setAnswer({...answers, [id]: answer})
    }

    const value: FormContext = {
        steps,
        currentStepId: id,
        setStepId: setId,
        currentStep,
        answer: (data: string) => {
            console.log('=== answer data', data)
            saveAnswer(data)
            if (id !== 9) {
                setId(getNextId(id))
            }
            return {
                ...answers,
                [id]: data
            }
        },
        submitAnswers: () => {},
        getLead: (externalAnswers?: Record<number, string>) => {
            const answersToProcess = externalAnswers ?? answers

            return {
                from: JSON.parse(answersToProcess[0]).from,
                to: JSON.parse(answersToProcess[0]).to,
                venue_from: answersToProcess[1],
                venue_to: answersToProcess[2],
                bedrooms: answersToProcess[3],
                people: answersToProcess[4],
                items: answersToProcess[5],
                storage_size: answersToProcess[6],
                move_type: answersToProcess[7],
                date: answersToProcess[8],
                user_name: JSON.parse(answersToProcess[9]).name,
                user_email: JSON.parse(answersToProcess[9]).email,
                user_phone: JSON.parse(answersToProcess[9]).phone,
            }
        }
    }

    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    )
}

export const useForm = () => {
    return useContext(FormContext)
}