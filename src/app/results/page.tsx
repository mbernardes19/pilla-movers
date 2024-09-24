import { createClient } from "@/utils/db";
import { notFound } from 'next/navigation';

async function getFormSubsmissionsFromDb(): Promise<any[]|null> {
    const supabase = await createClient()
    const res = await supabase.auth.signInWithPassword({ email: process.env.DB_USER!, password: process.env.DB_PASS!})
    if (!res.error) {
        const response = await supabase.from(process.env.LEADS_TABLE!).select()
        if (response.status > 200) {
            throw new Error(`Failed to submit lead data to DB. DB status: ${response.statusText}. Error: ${JSON.stringify(response.error || {})}`)
        }
        return response.data
    } else {
        throw new Error(`Failed to login DB user: ${res.error.name} ${JSON.stringify(res.error)}`)
    }
}

export default async function Results({ searchParams }) {
    const keyParam = searchParams?.key || 'No query param';
    console.log('=== searchParams', searchParams)
    console.log('=== keyParam', keyParam)
    if (keyParam !== '123') {
        return notFound()
    }
    const results = await getFormSubsmissionsFromDb()

    return (
        <div>
            {results?.map((result, idx) => (
                <div key={idx} className="mb-12">
                {Object.entries(result).map(([key, val]) => (
                    <div className={key !== 'id' ? 'ml-8' : 'ml-2'}>
                        {!result[key] ? null : <h4 className="m-0">{key}</h4>}
                        <p>{val as string}</p>
                    </div>
                ))}
                </div>
            ))}
        </div>
    );
}
