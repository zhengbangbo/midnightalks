export const getEpisodeId = (filename: string) => {
  return /episodes[/\\](.*?)\.md$/.exec(filename)?.[1] ?? undefined
}
