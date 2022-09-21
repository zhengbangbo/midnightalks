<script setup lang="ts">
import type { EpisodeModule } from '../typing/types'
import { getAllEpisodes, getEpisodeId } from '../utils/episode'
const episodes = getAllEpisodes()

let sort = $ref<'asc' | 'desc'>('desc')
const handleSort = () => {
  sort = sort === 'asc' ? 'desc' : 'asc'
}

const sortedEpisodes = $computed(() =>
  [...episodes].sort((a, b) => {
    if (sort === 'asc')
      return a.date.getTime() - b.date.getTime()
    else
      return b.date.getTime() - a.date.getTime()
  }))
</script>

<template>
  <div flex="~ row gap-2" justify-end items-center py-2 px-6>
    <div flex="~ row gap-1" items-center cursor-pointer border-1 border-rounded @click="handleSort">
      <div :class="sort === 'desc' ? 'i-carbon-sort-descending' : 'i-carbon-sort-ascending'" />
      <div>
        按发布时间排序
      </div>
    </div>
  </div>
  <div flex="~" gap-2 px-2 flex-wrap justify-center items-center>
    <episode-item v-for="info in sortedEpisodes" :key="info.id" :info="info" />
  </div>
</template>
