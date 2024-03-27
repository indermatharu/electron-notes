import { LuFileSignature } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { useSetAtom } from 'jotai'
import { createEmptyNoteAtom } from '@/store'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className={twMerge('w-4 h-4 text-zinc-200', props.className)} />
    </ActionButton>
  )
}
