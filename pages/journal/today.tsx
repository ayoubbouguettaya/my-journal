import React from 'react'
import Layout from '../../components/Layout'
import MyDailyJournal from '../../components/MyDialyJournal'

type Props = {}

const TodayJournal = (props: Props) => {
    return (
        <Layout>
            <MyDailyJournal />
        </Layout>
    )
}

export default TodayJournal