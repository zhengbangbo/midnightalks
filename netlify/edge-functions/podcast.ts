import type { Context } from 'https://edge.netlify.com'

export default async (context: Context) => {
  const podcastData = await fetch('https://rss.lizhi.fm/rss/14275.xml')
  if (!podcastData.ok) return context('Not Found', 404)
  const podcastDataText = await podcastData.text()
  return context(podcastDataText, 200)
}
