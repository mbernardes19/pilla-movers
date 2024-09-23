import { createClient } from "@/utils/db"
import { Lead } from "@/utils/types"

export const submitLead = async (leadData: Lead) => {
    const supabase = await createClient()
    const response = await supabase.from(process.env.LEADS_TABLE!).insert(leadData)
    if (response.status < 201) {
        throw new Error(`Failed to submit lead data to DB. DB status: ${response.statusText}. Error: ${JSON.stringify(response.error || {})}`)
    }
}