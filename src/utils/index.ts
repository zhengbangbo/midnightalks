export interface podcast {
  description: string
  category: []
  image: string
  items: episode[]
  link: string
  title: string
}

export interface episode {
  author: undefined
  category: []
  content: undefined
  created: number
  description: string
  'enclosures': object[]
  'id': undefined
  'itunes_author': string
  'itunes_duration': number
  'itunes_image': image
  'link': string
  'media': {}
  'published': number
  'title': string
}

export interface image {
  href: string
}

export function getPodcastTitle(date: podcast) {
  return date.title
}

export function getPodcastDescription(date: podcast) {
  return date.description
}

export function getEpisode(date: podcast) {
  return date.items
}

export function getEpisodeTitle(aEpisode: episode) {
  return aEpisode.title
}

export function getEpisodeDescription(aEpisode: episode) {
  return aEpisode.description
}

export function getEpisodeCreated(aEpisode: episode) {
  return aEpisode.created
}

export function getEpisodeCover(aEpisode: episode) {
  return fixedCoverUrl(aEpisode.itunes_image?.href)
}

export function fixedCoverUrl(originUrl: string) {
  if (!originUrl) return ''
  if (originUrl.length === 69)
    return `https${originUrl.toString().slice(4, 59)}.jpg`

  if (originUrl.length === 70)
    return `https${originUrl.toString().slice(4, 60)}.jpg`

  return `https${originUrl.toString().slice(4, 62)}_1000x1000.jpg`
}
