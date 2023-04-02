import NextHead from 'next/head'
import { HeadProps } from './types'

export function Head (props: HeadProps) {
  const {
    description,
    title,
    image = '',
    og,
    twitter
  } = props

  const twitterMeta = {
    description: twitter?.title || title,
    image: twitter?.image || image,
    title: twitter?.title || title
  }

  const ogMeta = {
    description: og?.description || description,
    title: og?.title || title,
    image: og?.image || image
  }

  return (
    <NextHead>
      <title>{title}</title>
      {description && <meta name="description" content={description}/>}
      <meta property="og:locale" content="pt-BR" />
      <meta property="og:title" content={ogMeta.title} />
      {ogMeta.description && <meta property="og:description" content={ogMeta.description} />}
      {ogMeta.image && <meta property="og:image" content={ogMeta.image} />}
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={twitterMeta.title} />
      {twitterMeta.image && <meta property="twitter:image" content={twitterMeta.image} />}
      {twitterMeta.description && <meta property="twitter:description" content={twitterMeta.description} />}
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </NextHead>
  )
}