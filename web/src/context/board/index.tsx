import { uuid } from 'uuidv4'

import { appSettings } from '@/config/app'
import { useBoolean, useLocalStorage } from '@/hooks'
import { useRouter } from 'next/router'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react"
import { Board, BoardContextParams, CreateBoardPayload, CreateTaskPayload } from "./types"

const BoardContext = createContext({} as BoardContextParams)

export function BoardProvider ({ children }: PropsWithChildren) {
  const router = useRouter()

  const [boards, setBoards] = useLocalStorage<Board[]>(`${appSettings.appName}:boards`, [])

  const [editBoardData, setEditBoardData] = useState<Board | null | undefined>(null)

  const [isOpenCreateBoardModal, toggleIsOpenCreateBoard] = useBoolean(false)
  const [isOpenCreateTaskModal, toggleIsOpenCreateTask] = useBoolean(false)

  const findBoardById = useCallback((id: string) => {
    return boards.find(value => value.id === id)
  }, [boards])

  const findColumnById = (columnId: string) => {
    return boards
      .map(value => value.columns)
      .reduce((prev, next) => ([
        ...prev, 
        ...next
      ]))
      .find(value => value.id === columnId)
  }

  const deleteTask = (columnId: string, taskId: string) => {
    setBoards(prevState =>
      prevState.map(board => 
        board.id === currentBoard?.id
          ? ({
            ...board,
            columns: board.columns.map(column => 
              column.id === columnId
                ? ({
                  ...column,
                  tasks: column?.tasks?.filter(task => task.id !== taskId)
                })
                : column  
            )
          })
          : board
      )
    )
  }

  const deleteBoard = () => {
    setBoards(prevState => prevState.filter(board => board.id !== currentBoard?.id))
  }

  const currentBoard = useMemo(() => {
    const { id } = router.query

    if (!id) return undefined

    return findBoardById(id as string)
  }, [findBoardById, router.query])

  const createBoard = (payload: CreateBoardPayload) => {
    setBoards(prevState => ([
      ...prevState,
      {
        id: uuid(),
        name: payload.name,
        columns: payload.columns.map(value => ({
          id: uuid(),
          name: value.name
        }))
      }
    ]))
  }

  const upsertBoard = (payload: CreateBoardPayload, id?: string) => {
    const boardsId = boards.map(value => value.id)

    if (!id || !boardsId.includes(id)) return createBoard(payload)

    setBoards(prevState => 
      prevState.map(board =>
        board.id === id
          ? ({
            ...board,
            name: payload.name,
            columns: payload.columns.map(value => ({
              id: uuid(),
              name: value.name
            }))
          })
          : board  
      )  
    )
  }

  const createTask = (
    boardId: string, 
    columnId: string, 
    payload: CreateTaskPayload
  ) => {
    setBoards(prevState => {
      const board = prevState.find(board => board.id === boardId)

      if (!board) return [
        ...prevState
      ]

      const column = board.columns.find(column => column.id === columnId)

      if (!column) return [
        ...prevState
      ]

      return prevState.map(board => (
        board.id === boardId 
          ? ({
            ...board,
            columns: board?.columns.map(column => 
              column.id === columnId 
                ? ({
                  ...column,
                  tasks: ([
                    ...(column?.tasks || []),
                    {
                      id: uuid(),
                      name: payload.name,
                      description: payload?.description,
                    }
                  ])
                })
                : column  
            )
          })
          : board
      ))
    })
  }

  const moveTaskToColumn = (
    fromColumn: string, 
    toColumn: string,
    taskId: string, 
  ) => {
    const task = findColumnById(fromColumn)
      ?.tasks
      ?.find(value => value.id === taskId)

    if (!task) return;

    setBoards(prevState => 
      prevState.map(
        board => board.id === currentBoard?.id
          ? ({
            ...board,
            columns: board.columns.map(
              value => 
                value.id === fromColumn 
                  ? ({
                    ...value,
                    tasks: value.tasks?.filter(value => value.id !== taskId)
                  })
                  : value
            ).map(value => 
              value.id === toColumn
                ? ({
                  ...value,
                  tasks: [
                    ...(value?.tasks || []),
                    task
                  ]
                })
                : value
            )
          })
          : board
      )
    )

  }

  const editBoard = () => {
    toggleIsOpenCreateBoard()
    setEditBoardData(currentBoard)
  }

  const closeBoardForm = () => {
    setEditBoardData(null)
    toggleIsOpenCreateBoard()
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        editBoardData,
        findBoardById,
        createBoard,
        isOpenCreateBoardModal, 
        toggleIsOpenCreateBoard,
        createTask,
        currentBoard,
        isOpenCreateTaskModal, 
        toggleIsOpenCreateTask,
        moveTaskToColumn,
        closeBoardForm,
        deleteTask,
        editBoard,
        deleteBoard,
        upsertBoard
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => useContext(BoardContext)