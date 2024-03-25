import { LuFileSignature } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { ActionButton, ActionButtonProps } from './ActionButton'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuFileSignature className={twMerge('w-4 h-4 text-zinc-200', props.className)} />
    </ActionButton>
  )
}
