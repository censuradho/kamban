export interface Task {
  id: string
  name: string
  description?: string
  subtasks?: Task[]
}

export interface Column {
  id: string
  name: string
  tasks?: Task[]
}

export interface Board {
  id: string
  name: string
  columns: Column[]
}

export interface CreateTaskPayload extends Pick<Task, 'name' | 'description'> {
  subtasks?: CreateTaskPayload[]
}

export interface CreateBoardPayload extends Pick<Board,
  'name'
> {
  columns: Pick<Column,
    'name'
  >[]
}


export interface BoardContextParams {
  boards: Board[]
  currentBoard?: Board 
  isOpenCreateBoardModal: boolean
  isOpenCreateTaskModal: boolean,
  editBoardData?: Board | null
  toggleIsOpenCreateTask: () => void
  toggleIsOpenCreateBoard: () => void
  findBoardById: (id: string) => Board | undefined
  createBoard: (payload: CreateBoardPayload) => void
  createTask: (boardId: string, columnId: string, payload: CreateTaskPayload) => void
  moveTaskToColumn: (fromColumn: string, toColumn: string, taskId: string) => void
  deleteTask: (columnId: string, taskId: string) => void
  editBoard: () => void
  closeBoardForm: () => void
  deleteBoard: () => void
  upsertBoard: (payload: CreateBoardPayload, id?: string) => void
}