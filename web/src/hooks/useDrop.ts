import { RefObject, createRef, useState } from "react";
import { useEventListener } from "./useEventListener";

interface DropProps<T> {
  onDrop?: (payload: T) => void
}

interface DropOptions {
  isOver: boolean,
}

export function useDrop <T = {}>(props?: DropProps<T>): [DropOptions, RefObject<any>]  {
  const ref= createRef<any>()

  const [isOver, setIsOver] = useState(false)

  const handleGetPayload = (dataTransfer: DataTransfer | null): T => {
    return JSON.parse(dataTransfer?.getData('text') || '{}')
  }

  useEventListener('dragenter', (event) => {
    setIsOver(true)
  }, ref)

  useEventListener('dragleave', (event) => {
    setIsOver(false)
  }, ref)

  useEventListener('dragover', (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    }

    return false;
  }, ref)

  useEventListener('drop', (event) => {
    event.stopPropagation(); 
    event.preventDefault();

    const { dataTransfer } = event as DragEvent

    
    props?.onDrop?.(handleGetPayload(dataTransfer))
    return false;
  }, ref)

  return [
    {
      isOver,
    },
    ref
  ]
}