import { useEffect, useState } from 'react'
import { formatDate } from '../../utils/formatDate'

export interface Journal {
  id: string,
  md: string,
  isToday?: boolean
}

const useJournals = () => {
  const [journals, setJournals] = useState<Journal[]>([])
  const [todaysJournal, setTodaysJournal] = useState<Journal | null>(null)

  useEffect(() => {
    const journalsTmp: Journal[] = JSON.parse(localStorage.getItem("journals") || '[]')
    const todayFormattedDate = formatDate(new Date());

    setJournals(
      journalsTmp.map((journal) => ({
        ...journal,
        isToday: todayFormattedDate === journal.id ? true : false
      })));
  }, []);

  useEffect(() => {
    setTodaysJournal(journals.find((journal) => journal.isToday) || {} as Journal)
  }, [journals])

  const getJournalByDay = (day: string) => {
    return journals.find((journal) => journal.id === day) || null;
  }

  const updateTodaysJournal = (newContent: string) => {
    const todayFormatedDate = formatDate(new Date())

    const foundIndex = journals.findIndex((journal) => journal.id === todayFormatedDate)

    if (foundIndex !== -1){
      journals[foundIndex].md = newContent
    }else{
      journals.unshift({id: formatDate(new Date()),md: newContent,isToday: true})
    }
    localStorage.setItem("journals",JSON.stringify(journals))
    setJournals([...journals])
  }

  return ({ journals ,todaysJournal,updateTodaysJournal,getJournalByDay})
}

export default useJournals