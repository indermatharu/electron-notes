import { NotesMocks } from '@/store/mocks'
import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'

export const notesAtom = atom<NoteInfo[]>(NotesMocks)

export const selectedNoteIndexAtom = atom<number | undefined>(undefined)

export const selectedNoteAtom = atom((get) => {
  const index = get(selectedNoteIndexAtom)
  if (index == null) return
  const notes = get(notesAtom)

  return {
    ...notes[index],
    content: `
    Hello from jotai notes # ${index}
    `
  }
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const title = `Note ${notes.length}`

  const newNote: NoteInfo = {
    title,
    lastEditTime: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes])

  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)
  if (selectedNoteIndex == null) return

  set(
    notesAtom,
    notes.filter((_, i) => i !== selectedNoteIndex)
  )

  set(selectedNoteIndexAtom, undefined)
})
