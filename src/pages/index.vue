<script setup lang="ts">
import type { EpisodeInfo } from '../typing/types'
import { getEpisodeId } from '../utils/str'
const episodes = import.meta.glob('../episodes/*.md', { eager: true })

const episodeInfo = Object.entries(episodes).map(
  ([filename, module]): EpisodeInfo => {
    const id = getEpisodeId(filename)!
    return {
      id,
      date: new Date(module.date),
      title: module.title,
      hosts: module.hosts,
      guests: module.guests,
      description: module.description,
    }
  })
</script>

<template>
  <div flex="~" gap-2 px-2 flex-wrap justify-center items-center>
    <episode-item v-for="info in episodeInfo" :key="info.id" :info="info" />
  </div>
</template>
