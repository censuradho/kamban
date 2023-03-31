import { Box, DialogAlert, Dropdown, Icon, Select, Typography } from '@/components'
import { useBoard } from '@/context/board'
import { useBoolean } from '@/hooks'
import { PropsWithChildren, useState } from 'react'
import * as Styles from './styles'
import { TaskInfoProps } from './types'

export function TaskInfo (props: PropsWithChildren<TaskInfoProps>) {

  const { data, children } = props

  return (
    <Styles.Root>
      {/* <DialogAlert
        title="Delete this task?"
        description={`Are you sure you want to delete the ${data.name} task and its subtasks? This action cannot be reversed.`}
        open={isOpenDeleteModal}
        onOpenChange={toggleIsOpenDeleteModal}
        onCancel={toggleIsOpenDeleteModal}
        onConfirm={() => handleDelete(columnId, data.id)}
      /> */}
      <Styles.Trigger>{children}</Styles.Trigger>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box justifyContent="space-between">
            <Typography 
              as="strong" 
              fontWeight="500" 
              size="md"
              color="heading"
            >{data?.name}</Typography>
            <Dropdown 
              options={[
                {
                  label: <Typography>Edit Task</Typography>,
                  // onClick: editBoard
                },
                {
                  label: <Typography color="error">Delete Task</Typography>,
                  // onClick: toggleIsOpenDeleteModal
                },
              ]}
            >
              <Icon name="verticalDots" color="text" size={20} />
            </Dropdown>
          </Box>
          <Typography 
            as="p" 
            color="text" 
            size="xsm"
          >{data?.description}</Typography>
          {/* <Select
            label="Current Status"
            defaultValue={columnId}
            onValueChange={setColumnSelected}
            options={
              currentBoard?.columns.map(column => ({
                label: column.name,
                value: column.id
              })) || []
            }
          /> */}
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}