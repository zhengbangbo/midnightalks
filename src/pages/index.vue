<script setup lang="ts">
import { getAllEpisodes } from '../utils/episode'
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
  <div flex="~ col" justify-center px-2>
    <div flex="~ row gap-2" justify-end items-center py-2 px-6>
      <div flex="~ row gap-1" items-center cursor-pointer border-1 border-rounded @click="handleSort">
        <div :class="sort === 'desc' ? 'i-carbon-sort-descending' : 'i-carbon-sort-ascending'" />
        <div>
          按发布时间排序
        </div>
      </div>
    </div>
    <div class="episode-container" gap-2 justify-center grid>
      <episode-item v-for="info in sortedEpisodes" :key="info.id" :info="info" />
    </div>
  </div>
</template>

<style scoped>
.episode-container {
  grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
}
</style>
