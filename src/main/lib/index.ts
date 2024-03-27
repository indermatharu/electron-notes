import { appDirectoryName, fileEncoding, welcomeFileName } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdirSync, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import WelcomeNote from '../../../resources/WelcomeNote.md?asset'

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

  if (isEmpty(notes)) {
    console.log(`No notes found creating default one`)
    const content = await readFile(WelcomeNote, { encoding: 'utf8' })
    await writeFile(`${rootDir}/${welcomeFileName}`, content, { encoding: 'utf8' })
    notes.push(welcomeFileName)
  }

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

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()
  console.info(`Writing note ${fileName}`)

  return writeFile(`${rootDir}/${fileName}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note create canceled')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)
  if (parentDir != rootDir) {
    dialog.showMessageBox({
      type: 'error',
      title: 'File creation failed',
      message: `All files should be under ${rootDir}. Avoid using other directories`
    })
    return false
  }

  console.info(`Creating note ${filePath}`)
  await writeFile(filePath, '')
  return fileName
}

export const deleteNote: DeleteNote = async (fileName: NoteInfo['title']) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Do you want to delete ${fileName}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Deletion aborted!')
    return false
  }

  console.info(`Deleting note ${fileName}`)
  await remove(`${rootDir}/${fileName}.md`)
  return true
}
