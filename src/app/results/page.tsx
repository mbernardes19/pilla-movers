/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Lead } from "@/components/Lead/Lead";
import { createClient } from "@/utils/db";
import { notFound } from 'next/navigation';

async function getFormSubsmissionsFromDb(): Promise<any[]|null> {
    const supabase = await createClient()
    const res = await supabase.auth.signInWithPassword({ email: process.env.DB_USER!, password: process.env.DB_PASS!})
    if (!res.error) {
        const response = await supabase.from(process.env.LEADS_TABLE!).select().order('id', { ascending: false })
        if (response.status > 200) {
            throw new Error(`Failed to submit lead data to DB. DB status: ${response.statusText}. Error: ${JSON.stringify(response.error || {})}`)
        }
        return response.data
    } else {
        throw new Error(`Failed to login DB user: ${res.error.name} ${JSON.stringify(res.error)}`)
    }
}

export default async function Results({ searchParams }: { searchParams: Record<string, string>}) {
    const keyParam = searchParams?.key || 'No query param';
    if (keyParam !== process.env.RESULTS_KEY) {
        return notFound()
    }
    const results = await getFormSubsmissionsFromDb()

    return (
        <div className="px-4 md:p-0">
            {results?.map((result, idx) => (
                <Lead key={idx} leadData={result} />
            ))}
        </div>
    );
}
