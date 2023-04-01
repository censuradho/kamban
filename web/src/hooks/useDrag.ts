import { MutableRefObject, RefObject, createRef, useEffect, useRef } from "react";
import { useEventListener } from "./useEventListener";
import { useState } from "react";

interface DragOptions {
  isDragging: boolean
}

type UseDragReturn = [DragOptions, RefObject<any>] 

interface DragPrams {
  name: string
}

export function useDrag (params: DragPrams): UseDragReturn {
  const ref = createRef<any>()
  const [isDragging, setIsDragging] = useState(false)

  useEventListener('dragstart', (event) => {
    if (!ref.current) return

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