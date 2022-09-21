export const getEpisodeId = (filename: string) => {
  return /episodes[/\\](.*?)\.md$/.exec(filename)?.[1] ?? undefined
}

export const getAllEpisodes = () =>
  Object.entries(
    import.meta.glob('../episodes/*.md', { eager: true }))
    .map(
      ([filename, module]) => {
        const id = getEpisodeId(filename)!
        return {
          ...module,
          date: new Date(module.date),
          id,
        }
      },
    )
