<script setup lang="ts">
import { getAllEpisodes } from '../../utils/episode'
const { id } = defineProps<{ id: string }>()
const episode = getAllEpisodes().filter(episode => episode.id === id)[0]
</script>

<template>
  <div container mx-auto px-4>
    <component :is="episode.default" v-if="episode" />
  </div>
</template>

<style scoped>

</style>
