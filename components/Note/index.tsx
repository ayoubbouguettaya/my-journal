import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import usenotes from '../hook/useNotes'

import styles from './note.module.css'
import EditableContent from '../UI/Editable'

type Props = {
  id: string,
}



const NoteComponent = (props: Props) => {
  const { getNoteById, updateNoteById } = usenotes()
  const [md, setMd] = useState("")

  const editableRef = useRef<HTMLDivElement | null>(null)

  const handleOnChange = (event: any) => {
    event.persist();
    setMd(editableRef.current?.innerHTML || '');
  }

  const handleSave = useCallback(() => {
    updateNoteById({ id: props.id, md })
  }, [md,props.id])

  useEffect(() => {
    setMd(getNoteById(props.id)?.md || "")
  }, [props.id])

  return (
    <div className={styles.note_container}>
      <EditableContent
        editableRef={editableRef}
        handleOnChange={handleOnChange}
        handleSave={handleSave}
        md={md}
      />
    </div>
  )
}

export default NoteComponent

interface EmojiPickerProps {
  showEmoji: boolean,
  handleCopy: (emoji: string) => void,
  toggleEmoji: () => void
}
const EmojiPicker = ({ showEmoji, handleCopy, toggleEmoji }: EmojiPickerProps) => {
  const Imojis = [
    '✔️', '🚀', '💵', '⚔️', '👌🏻', '🤌🏻', '🤲🏻', '👊🏻', '🤙🏻', '☝🏻', '👏🏻', '🏆', '🥇', '🥈', '🥉', '🏅', '🎬', '🎧',
    '✈️', '💰', '⏰', '⏱', '🔑', '🛒', '🛌', '📆', '🆚', '⛔️', '❌', '⭕️', '❗️', '❕', '❓', '❔', '‼️', '⁉️',
    '✅', '✳️', '❎', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣',
    '🔟', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '☑️', '🔘', '🔴', '🟠', '🟡',
    '🟢', '🔵', '🟣', '⚫️', '⚪️', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾️', '◽️', '◼️',
    '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛️', '⬜️', '🟫', '🏳️', '🏴', '🏁', '🚩', '🇩🇿', '🇦🇪', '🇬🇧', '🇶🇦', '🇫🇷'
  ]
  return (<div className={styles.emoji_picker_container}>

    {showEmoji ? (

      <ul>
        {Imojis.map((car) => (
          <li key={car} onClick={() => handleCopy(car)}>
            {car}
          </li>
        ))}
      </ul>
    ) : (<button onClick={toggleEmoji}>
      <img src="/icon/more-vertical.svg" />
    </button>)}
  </div>)
}