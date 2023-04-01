import { Box, ButtonIcon, Dropdown, Icon, Typography } from '@/components'
import * as Styles from './styles'
import { ColumnProps } from './types'
import { PropsWithChildren } from 'react'

export function Column (props: PropsWithChildren<ColumnProps>) {
  const {
    data,
    taskAmount,
    children
  } = props

  return (
    <Styles.Container>
      <Styles.Header>
        <Box justifyContent="space-between" alignItems="center">
          <Typography 
            color="heading"
            fontWeight="600"
          >
            {`${data.name} (${taskAmount})`}
          </Typography>
          <Dropdown
            options={[
              {
                label: (
                  <Box gap={1} alignItems="center">
                    <Icon name="edit"  size={15} color="heading" />
                    <Typography color="heading">Edit column</Typography>
                  </Box>
                ),
                onClick: () => {
                  // setColumnToEdit(column)
                  // toggleIsOpenColumnForm()
                }
              },
              {
                label: (
                  <Box gap={1} alignItems="center">
                    <Icon name="trash" color="error" size={15} />
                    <Typography color="error">Delete column</Typography>
                  </Box>
                ),
                // onClick: () => setColumnToDelete(column)
              },
            ]}
          >
            <ButtonIcon
              label="menu" 
              icon={{ 
                name: 'verticalDots' 
              }} 
            />
          </Dropdown>
        </Box>
      </Styles.Header>
      <Styles.Body>
        {children}
      </Styles.Body>
      <Styles.Footer>
        <Styles.AddTaskButton 
          // onClick={() => {
          //   toggleIsOpenTaskForm()
          //   setColumnToRelateTask(column.id)
          // }}
        >+ Add item</Styles.AddTaskButton>
      </Styles.Footer>
    </Styles.Container>
  )
}