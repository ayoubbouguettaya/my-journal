import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import NoteComponent from '../../components/Note'

type Props = {}

const NotePage = (props: Props) => {
    const router = useRouter()
    const [idQuery,setidQuery]= useState('')

    useEffect(()=>{
        const slug = router.query && typeof router.query.id === "string" ? router.query.id : "";
        setidQuery(slug)
    },[router.query])

  return (
    <Layout dark>
        <NoteComponent id={idQuery}/>
    </Layout>
  )
}

export default NotePage