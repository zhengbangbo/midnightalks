<script setup lang="ts">
const { episodeData, goTo } = defineProps<{
  episodeData?: {
    created: number
    itunes_image: {
      href: string
    }
    title: string
  }[]
  goTo: {
    episodeDetail: Function
  }
}>()
</script>

<template>
  <div grid grid-cols-3 gap-2 justify-items-center w-full h-full style="grid-template-rows: min-content auto auto auto minmax(0, 1fr);">
    <div
      v-for="{ created, itunes_image, title } in episodeData"
      :id="created.toString()" :key="created.toString()" relative
      w-100 h-100
    >
      <CoverCard :created="created" :itunes_image="itunes_image" :title="title" :go-to="goTo.episodeDetail" />
    </div>
  </div>
</template>
