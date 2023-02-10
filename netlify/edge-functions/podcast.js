export default async (context) => {
  const podcastData = await fetch('https://rss.lizhi.fm/rss/14275.xml')
  return context(podcastData)
}

