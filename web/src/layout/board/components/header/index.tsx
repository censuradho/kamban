import { Box, DialogAlert, Dropdown, Icon, Typography } from '@/components'
import { paths } from '@/constants/routes'
import { useBoard } from '@/context/board'
import { useBoolean } from '@/hooks'
import { useMainLayoutContext } from '@/layout/main'
import { useRouter } from 'next/router'
import * as Styles from './styles'

export function Header () {
  const router = useRouter()

  const { 
    toggleOpenNavigation,
  } = useMainLayoutContext()

  const { 
    editBoard,
    deleteBoard 
  } = useBoard()

  const { toggleIsOpenCreateTask, currentBoard } = useBoard()

  const [isOpenDeleteModal, toggleIsOpenDeleteModal] = useBoolean(false)

  const handleDelete = () => {
    deleteBoard()
    toggleIsOpenDeleteModal()
    router.push(paths.home)
  }

  return (
    <Styles.Container>
      <DialogAlert
        title="Delete this board?"
        description={`Are you sure you want to delete the ${currentBoard?.name} board and all tasks? This action cannot be reversed.`}
        open={isOpenDeleteModal}
        onOpenChange={toggleIsOpenDeleteModal}
        onCancel={toggleIsOpenDeleteModal}
        onConfirm={handleDelete}
      />
      <h1 onClick={toggleOpenNavigation}>{currentBoard?.name}</h1>
      <Box gap={1}>
        <Styles.AddTaskMobile onClick={toggleIsOpenCreateTask}>+</Styles.AddTaskMobile>
        <Dropdown 
          options={[
            {
              label: <Typography>Edit Board</Typography>,
              onClick: editBoard
            },
            {
              label: <Typography color="error">Delete Board</Typography>,
              onClick: toggleIsOpenDeleteModal
            },
          ]}
        >
          <Icon name="verticalDots" color="text" size={20} />
        </Dropdown>
      </Box>
    </Styles.Container>
  )
}