import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote } from '@shared/types'
import { ensureDir, readFile, readdirSync, stat } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFileNames = await readdirSync(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((noteFileName) => noteFileName.endsWith('.md'))
  return Promise.all(notes.map(getNoteInfo))
}

export const getNoteInfo = async (fileName: string): Promise<NoteInfo> => {
  const fileStat = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStat.mtimeMs
  }
}
export const readNote: ReadNote = async (fileName) => {
  return readFile(`${getRootDir()}/${fileName}.md`, { encoding: fileEncoding })
}
