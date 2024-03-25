import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkDownEditor,
  NotePreviewList,
  RootLayout,
  SideBar
} from '@/components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <SideBar className="p-2">
          <ActionButtonRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </SideBar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkDownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
