import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './home.module.css';
import useJournals, { Journal } from '../hook/useJournals';
import useNotes, { Note } from '../hook/useNotes';
import { useRouter } from 'next/router';

type Props = {}

const HomeComponent = (props: Props) => {



  return (
    <div className={styles.home_container}>
      <h5>Thought</h5>
      <NotesItems />

      {/* <h5>¨ Daily ¨</h5> */}
      {/* <JournalsItems /> */}
    </div>
  )
}

export default HomeComponent


const JournalsItems = () => {
  const { journals } = useJournals()

  return (
    <ul>
      {journals.findIndex((journal) => journal.isToday) === -1 && (
        <Link href={`/journal/today`}>
          <li className={styles.active} >
            Write your Journal
            <img src={`/icon/pen-tool.svg`} />
          </li>
        </Link>
      )}
      {journals.map((journal) => (
        <Link key={journal.id} href={`/journal/${journal.isToday ? 'today' : journal.id}`}>
          <li className={journal.isToday ? styles.active : ''} >
            {journal.id}
            <img src={journal.isToday ? `/icon/pen-tool.svg` : '/icon/eye.svg'} />
          </li>
        </Link>
      ))}
    </ul>
  )
}

const NotesItems = () => {
  const { notes, isIdAlreadyExist, } = useNotes();
  const router = useRouter();

  const [newNoteId, setNewNoteId] = useState('')
  const [error, setError] = useState('')

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.persist()
    setNewNoteId(event.currentTarget.value)
  }

  const handleAddNewNote = () => {
    if (isIdAlreadyExist(newNoteId)) {
      setError("note already existe")
      return;
    }

    router.replace(`/note/${newNoteId}`)
    return;
  }
  return (
    <ul>
      <li className={styles.add_note_container}>
        <div>
          <input value={newNoteId} name="newNoteId" onChange={handleOnChange} placeholder="Add new note" />
          <button onClick={handleAddNewNote}>
            <img src="/icon/plus.svg" />
          </button>
        </div>
        {error && (
          <p ><small>** {error}</small></p>
        )}
      </li>

      {
        notes.map((note) => (
          <li key={note.id}>
            <Link href={`/note/${note.id}`}>
              {note.id}
            </Link>
          </li>
        ))
      }
    </ul >
  )
}