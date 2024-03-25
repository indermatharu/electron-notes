import { notesAtom, selectedNoteIndexAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = (onSelect?: () => void) => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = (index: number) => {
    setSelectedNoteIndex(index)
    if (onSelect) {
      onSelect()
    }
  }
  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
