import React, { useCallback, useEffect, useRef, useState } from 'react'
import useJournals from '../hook/useJournals'
import EditableContent from '../UI/Editable'

import styles from './my-daily-journal.module.css'

type Props = {}

const MyDailyJournal = (props: Props) => {
  const { todaysJournal, updateTodaysJournal } = useJournals()
  const [md, setMd] = useState(todaysJournal?.md || "write today's Journal")
  const editableRef = useRef<HTMLDivElement | null>(null)

  const handleOnChange = (event: any) => {
    event.persist();
    setMd(editableRef.current?.innerHTML || '');
  }

  const handleSave = useCallback(() => {
    updateTodaysJournal(md)
  }, [md])

  useEffect(() => {

    if (todaysJournal?.md) {
      let html = todaysJournal?.md + " ";
      html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')

      console.log(html)
      setMd(html || "")
    }
  }, [todaysJournal])



  return (
    <div className={styles.mydaily_journal_container}>
      <EditableContent
        editableRef={editableRef}
        handleOnChange={handleOnChange}
        handleSave={handleSave}
        md={md}
      />
    </div>
  )
}

export default MyDailyJournal

