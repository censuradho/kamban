import { useBoolean } from '@/hooks'
import dynamic from 'next/dynamic'
import { createContext, PropsWithChildren, useContext } from 'react'
import * as Styles from './styles'
import { MainLayoutContextParams } from './types'

const Navigation = dynamic(() => import('./components').then(t => t.Navigation), {
  ssr: false
})

const BoardForm = dynamic(() => import('./components').then(t => t.BoardForm), {
  ssr: false
})

const TaskForm = dynamic(() => import('./components').then(t => t.TaskForm), {
  ssr: false
})

const MainLayoutContext = createContext<MainLayoutContextParams>({})

export function MainLayout ({ children }: PropsWithChildren) {
  const [isOpenNavigation, toggleOpenNavigation] = useBoolean(false)

  return (
    <MainLayoutContext.Provider
      value={{
        isOpenNavigation, 
        toggleOpenNavigation
      }}
    >
      <Styles.Container>
        <Navigation />
        <BoardForm />
        <TaskForm />
        <Styles.Wrapper>
          {children}
        </Styles.Wrapper>
      </Styles.Container>
    </MainLayoutContext.Provider>
  )
}

export const useMainLayoutContext = () => useContext(MainLayoutContext)