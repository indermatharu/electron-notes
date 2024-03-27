import { NoteContent, NoteInfo } from '@shared/models'
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

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom) ?? []
  const title = await window.context.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes])

  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (selectedNote == null || notes == null) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)

  if (!isDeleted) return

  set(
    notesAtom,
    notes.filter((note) => note.title != selectedNote.title)
  )

  set(selectedNoteIndexAtom, undefined)
})

export const saveNoteAtom = atom(null, async (get, set, content: NoteContent) => {
  const notes = get(notesAtom) ?? []
  const selectedNote = get(selectedNoteAtom)!

  if (selectedNote.title == '') return

  await window.context.writeNote(selectedNote.title, content)

  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        note.lastEditTime = Date.now()
      }
      return note
    })
  )
})
