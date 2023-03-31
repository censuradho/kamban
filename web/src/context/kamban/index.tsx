import { kambanService } from '@/services/api/kamban'
import { Kamban } from '@/services/api/kamban/types'
import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { KambanContextParams } from './types'

const KambanContext = createContext({} as KambanContextParams)

export function KambanProvider ({ children }: PropsWithChildren) {
  const [kamban, setKamban] = useState<Kamban | null>(null)

  const findKambanById = useCallback(async (id: string) => {
    const data = await kambanService.findById(id)

    setKamban(data)
  }, [])

  return (
    <KambanContext.Provider
      value={{
        kamban,
        findKambanById
      }}
    >
      {children}
    </KambanContext.Provider>
  )
}

export const useKamban = () => useContext(KambanContext)