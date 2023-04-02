import Link from 'next/link'

import { Box, Button, DragNDrop, Typography } from '@/components'
import { paths } from '@/constants/routes'
import { kambanService } from '@/services/api/kamban'
import { Kamban } from '@/services/api/kamban/types'
import { resolvePath } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { Header } from '../components'

import * as Styles from './styles'
import { useDrag } from '@/hooks/useDrag'

export function HomeLayout () {
  const [kambans, setKambans] = useState<Kamban[]>([])

  const handleGetKambans = async () => {
    const data = await kambanService.findMany()

    setKambans(data)
  }

  const handleCreateKamban = async () => {
    const data = await kambanService.create({ name: 'Untitled' })
    setKambans(prevState => ([
      data,
      ...prevState,
    ]))
  }

  const renderKambans = kambans.map(value => (
    <Styles.Item key={value.id}>
      <Link
       
        href={resolvePath(paths.kamban, { id: value.id })}
      >
        {value.name}
      </Link>
    </Styles.Item>
  ))

  useEffect(() => {
    handleGetKambans()
  }, [])

  return (
    <>
      <Header />
      <Styles.Container>
        <Styles.Content>
          <Styles.Header>
            <Box flexDirection="column">
              <Typography 
                as="h2" 
                fontWeight="600" 
                size="md"
                color="heading"
              >All boards</Typography>
              <Box marginTop={0.5}>
                <Typography size="xsm">{`${kambans.length} opens`}</Typography>
              </Box>
            </Box>
            <Button onClick={handleCreateKamban}>New board</Button>
          </Styles.Header>
          <Styles.List>{renderKambans}</Styles.List>
        </Styles.Content>
      </Styles.Container>
    </>
  )
}