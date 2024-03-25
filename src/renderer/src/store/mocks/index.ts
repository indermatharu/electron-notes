import { NoteInfo } from '@shared/models'

const time = new Date().getTime()

export const NotesMocks: NoteInfo[] = [
  {
    title: 'First notes',
    lastEditTime: time + 1
  },
  {
    title: 'Second notes',
    lastEditTime: time + 2
  },
  {
    title: 'Third notes',
    lastEditTime: time + 3
  },
  {
    title: 'Fourth notes',
    lastEditTime: time + 4
  },
  {
    title: 'Fifth notes',
    lastEditTime: time + 5
  },
  {
    title: 'Sixth notes',
    lastEditTime: time + 6
  }
]
