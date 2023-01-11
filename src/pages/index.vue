<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { PodcastData } from '../apis'
import { getEpisode, getEpisodeCover, getEpisodeCreated, getEpisodeTitle } from '../utils'

const episodeData = ref()
onBeforeMount(async () => episodeData.value = getEpisode(await PodcastData()))
const anchor = (sth: number) => `#${sth.toString()}`
</script>

<template>
  <div flex="~">
    <div flex-1 overflow-auto>
      <img
        v-for="ep in episodeData"
        :id="getEpisodeCreated(ep)" :key="getEpisodeCreated(ep)" v-lazy="getEpisodeCover(ep)"
        inline-block w="50%"
        :alt="getEpisodeTitle(ep)"
      >
    </div>

    <div overflow-auto w="38.2%" text-26px>
      <div v-for="ep in episodeData" :key="getEpisodeCreated(ep)">
        <a :href="anchor(getEpisodeCreated(ep))" hover="color-white">{{ getEpisodeTitle(ep) }}</a>
      </div>
    </div>
  </div>
</template>

