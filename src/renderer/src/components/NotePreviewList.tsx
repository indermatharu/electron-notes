import { NotePreview } from '@/components'
import { useNotesList } from '@/hooks/useNotesList'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NoteSelecteListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ className, onSelect, ...props }: NoteSelecteListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList(onSelect)

  if (notes.length === 0)
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )

  return (
    <ul className={className} {...props}>
      {notes.map((note, i) => (
        <NotePreview
          key={i}
          {...note}
          isActive={selectedNoteIndex === i}
          onClick={() => handleNoteSelect(i)}
        />
      ))}
    </ul>
  )
}
