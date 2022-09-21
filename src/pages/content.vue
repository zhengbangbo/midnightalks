<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getAllEpisodes } from '../utils/episode'
const { id } = defineProps<{ id: string }>()

const episode = getAllEpisodes().filter(episode => episode.id === id)[0]

const route = useRouter()
const handle = () => {
  route.push('/')
}
</script>

<template>
  <div flex="~ row gap-2" justify-end items-center py-2 px-6>
    <div flex="~ row gap-1" items-center cursor-pointer border-1 border-rounded @click="handle">
      <div i-carbon-home />
      <div>
        首页
      </div>
    </div>
  </div>
  <div container mx-auto px-4>
    <component :is="episode.default" v-if="episode" />
  </div>
</template>

<style scoped>

</style>
