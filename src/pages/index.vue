<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PodcastData } from '../apis'
import { getEpisode, getEpisodeCover, getEpisodeCreated, getEpisodeTitle } from '../utils'

const episodeData = ref()
onBeforeMount(async () => episodeData.value = getEpisode(await PodcastData()))
const router = useRouter()

const created = ep => getEpisodeCreated(ep)
const cover = ep => getEpisodeCover(ep)
const title = ep => getEpisodeTitle(ep)

const anchor = (ep: string) => `#${created(ep)}`
const goTo = {
  episodeDetail: (created: number) => {
    router.push({
      name: 'EpisodeDetail',
      params: {
        created,
      },
    })
  },
}
</script>

<template>
  <div flex="~">
    <div flex-1 overflow-auto>
      <img
        v-for="ep in episodeData"
        :id="created(ep)" :key="created(ep)" v-lazy="cover(ep)"
        inline-block w="50%" :alt="title(ep)"
        @click="goTo.episodeDetail(created(ep))"
      >
    </div>

    <div w="38.2%" text-26px>
      <div v-for="ep in episodeData" :key="getEpisodeCreated(ep)">
        <a :href="anchor(ep)" hover="color-white">{{ title(ep) }}</a>
      </div>
    </div>
  </div>
</template>

