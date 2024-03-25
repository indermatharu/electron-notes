import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)
  return (
    <div
      {...props}
      className={cn('cursor-pointer px-2.5 py-2 rounded-md transition-colors duration-300', {
        'bg-zinc-400/75': isActive,
        'hover:bg-zinc-500/75': !isActive
      })}
    >
      <h3 className="mb-1 font-bond truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
    </div>
  )
}
