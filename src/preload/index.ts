import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context isolation must be enabled in the Browser window!')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language
  })
} catch (error) {
  console.log(error)
}
