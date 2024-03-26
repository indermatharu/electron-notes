import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | undefined>(undefined)

const selectedNoteAtomAsync = atom(async (get) => {
  const index = get(selectedNoteIndexAtom)
  const notes = get(notesAtom)

  if (index == null || notes == null) return

  const selectedNote = notes[index]
  const content = await window.context.readNote(selectedNote.title)

  return {
    ...notes[index],
    content
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  if (notes == null) return

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

  if (selectedNoteIndex == null || notes == null) return

  set(
    notesAtom,
    notes.filter((_, i) => i !== selectedNoteIndex)
  )

  set(selectedNoteIndexAtom, undefined)
})
