import { FC } from "react"
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export type LeadProps = {
    leadData: {
        id: number
        created_at: string
        from: string
        to: string
        bedrooms?: string
        people?: string
        items?: string
        storage_size?: string
        move_type?: string
        date: string
        user_name: string,
        user_email: string
        user_phone: string
        venue_from: string
        venue_to: string
    }
}

const labels: Record<string, string> = {
    id: 'ID',
    created_at: 'Posted At',
    from: 'From',
    to: 'To',
    bedrooms: '# Of Bedrooms',
    people: '# Of People',
    items: '# Of Items',
    storage_size: 'Storage Size',
    move_type: 'Move Type',
    date: 'Expected Date',
    user_name: 'Client Name',
    user_email: 'Client Email',
    user_phone: 'Client Phone',
    venue_from: 'From Venue',
    venue_to: 'To Venue'
}

export const Lead: FC<LeadProps> = ({ leadData }) => {
    const dateKeys = ['created_at', 'date']
    return (
        <div className="w-full md:w-fit bg-[var(--pico-color)] rounded-[var(--pico-border-radius)] text-[var(--pico-background-color)] p-6 mb-12 max-w-full md:max-w-fit mx-auto grid grid-cols-2 md:grid-cols-[200px_400px]">
        {Object.entries(leadData).map(([key, val]) => (
            <>
            <div className="font-bold">
                {labels[key]}
            </div>
            <div className="ml-2 text-[var(--pico-background-color)]">
                {dateKeys.includes(key) ? dayjs(val as string).format('MM/DD/YYYY hh:mm A') : val as string}
            </div>
            </>
        ))}
        </div>
    )
}