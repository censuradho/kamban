import { ActiveLink } from '@/components'
import { appSettings } from '@/config/app'
import { paths } from '@/constants/routes'
import { useBoard } from '@/context/board'
import { useTheme } from '@/context/theme'
import { resolvePath } from '@/utils/helpers'
import Image from 'next/image'
import { useMainLayoutContext } from '../..'
import { ThemeSwitcher } from './components'
import * as Styles from './styles'

export function Navigation () {
  const { currentTheme } = useTheme()
  const { boards, toggleIsOpenCreateBoard } = useBoard()

  const { isOpenNavigation, toggleOpenNavigation } = useMainLayoutContext()

  const renderBoards = boards.map((board, index) => (
    <li key={index}>
      <Styles.BoardItem>
        <ActiveLink exact href={resolvePath(paths.board, { id: board.id })}>
          {board.name}
        </ActiveLink>
      </Styles.BoardItem>
    </li>
  ))

  return (
    <Styles.Root open={isOpenNavigation} onOpenChange={toggleOpenNavigation}>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Styles.Header>
            <Image src={currentTheme === appSettings.theme.darkMode ? "/logo.svg" : '/logo-lightmode.svg'} alt="Logo" width={190.94} height={33.07} />
          </Styles.Header>
          <Styles.BoardItem onClick={toggleOpenNavigation}>
            <ActiveLink href="/" exact>
                Home
            </ActiveLink>
          </Styles.BoardItem>
          <Styles.Nav>
            <Styles.BoardList onClick={toggleOpenNavigation}>              
              {renderBoards}
            </Styles.BoardList>
          </Styles.Nav>
          <Styles.BoardItem>
            <button onClick={toggleIsOpenCreateBoard}>+ Create new Board</button>
          </Styles.BoardItem>
          <div style={{ padding: '25px'}}>
            <ThemeSwitcher />
          </div>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}