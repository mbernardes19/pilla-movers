import { LeadForm } from "@/components/LeadForm/LeadForm";
import { Step } from "@/hooks/useForm";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import s from './GetAQuote.module.scss'

async function getFormSteps(): Promise<Step[]> {
    const query1 = defineQuery(`*[_id == "77c1f585-4392-491a-8f21-babe79ed6dfa"][0]{
      steps[]{
        id,
        next,
        question,
        options[]{
            icon{
                asset->{
                    url
                }
            },
            label
        }
      }
    }`)
    const query2 = await client.fetch(query1)
    // @ts-expect-error Test
    return query2?.steps as Step[]
}

export default async function GetAQuote() {
    const steps = await getFormSteps()
    
    return (
        <div className={s['container']}>
            <LeadForm steps={steps} />
        </div>
    );
}
