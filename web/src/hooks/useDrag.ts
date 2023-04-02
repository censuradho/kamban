import { RefObject, createRef, useEffect, useState } from "react";
import { useEventListener } from "./useEventListener";

interface DragOptions {
  isDragging: boolean
}

type UseDragReturn = [DragOptions, RefObject<any>] 

interface DragProps<T> {
  name: string
  payload?: T
}

export function useDrag <T>(props?: DragProps<T>): UseDragReturn {
  const ref = createRef<any>()
  const [isDragging, setIsDragging] = useState(false)

  const handleSetPayload = (dataTransfer: DataTransfer | null) => {
    dataTransfer?.setData('text/plain', JSON.stringify(props?.payload || {}))
  }

  useEventListener('dragstart', (event) => {
    if (!ref.current) return
   
    const { dataTransfer } = event as DragEvent

    handleSetPayload(dataTransfer)

    setIsDragging(true)
  }, ref)

  useEventListener('dragend', (event) => {
    if (!ref.current) return


    setIsDragging(false)
  }, ref)

  useEffect(() => {
    if (!ref?.current) return;
    ref.current.draggable = true
  }, [ref])

  return [
    {
      isDragging
    }, 
    ref]
}