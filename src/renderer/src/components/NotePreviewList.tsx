import { NotePreview } from '@/components'
import { NotesMocks } from '@/store/mocks'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (NotesMocks.length === 0)
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )

  return (
    <ul className={className} {...props}>
      {NotesMocks.map((note, i) => (
        <NotePreview key={i} {...note} />
      ))}
    </ul>
  )
}
