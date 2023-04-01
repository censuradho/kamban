import { RefObject, createRef } from "react";

export function useDrop (): [{}, RefObject<any>]  {
  const ref= createRef<any>()

  return [
    {},
    ref
  ]
}