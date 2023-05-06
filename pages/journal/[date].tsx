import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import JournalComponent from '../../components/Journal'
import Layout from '../../components/Layout'

type Props = {}

const JournalPage = (props: Props) => {
    const router = useRouter()
    const [dateQuery,setDateQuery]= useState('')

    useEffect(()=>{
        const slug = router.query && typeof router.query.date === "string" ? router.query.date : "";
        setDateQuery(slug)
    },[router.query])

    return (
        <Layout>
            <JournalComponent date={dateQuery} />
        </Layout>
    )
}


export default JournalPage