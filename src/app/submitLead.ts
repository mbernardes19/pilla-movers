'use server'

import { createClient } from "@/utils/db"
import { Lead } from "@/utils/types"

export const submitLead = async (leadData: Lead) => {
    const supabase = await createClient()
    const res = await supabase.auth.signInWithPassword({ email: process.env.DB_USER!, password: process.env.DB_PASS!})
    if (!res.error) {
        const response = await supabase.from(process.env.LEADS_TABLE!).insert(leadData)
        if (response.status > 201) {
            throw new Error(`Failed to submit lead data to DB. DB status: ${response.statusText}. Error: ${JSON.stringify(response.error || {})}`)
        }
        console.log('Successfully saved data')
    } else {
        throw new Error(`Failed to login DB user: ${res.error.name} ${JSON.stringify(res.error)}`)
    }
}