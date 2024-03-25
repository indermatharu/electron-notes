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
