import { useEffect, useState } from 'react'
import { formatDate } from '../../utils/formatDate'

export interface Note {
    id: string,
    md: string,
}


const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(() => {
        const notesTmp: Note[] = JSON.parse(localStorage.getItem("notes") || '[]')
        setNotes(notesTmp);

    }, []);


    const getNoteById = (id: string) => {
        return notes.find((note) => note.id === id) || null;
    }

    const updateNoteById = ({ id, md: newContent }: Note) => {
        const foundIndex = notes.findIndex((note) => note.id === id)

        if (foundIndex !== -1) {
            notes[foundIndex].md = newContent
        }else{
            notes.unshift({ id, md: newContent })
        }

        localStorage.setItem("notes", JSON.stringify(notes))
        setNotes([...notes])
    }

    const isIdAlreadyExist = (id: string) => {
        return notes.some((note) => note.id === id);
    }

    return ({ notes, getNoteById, updateNoteById, isIdAlreadyExist })
}

export default useNotes