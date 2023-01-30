<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PodcastData } from '../apis'
import { getEpisode, getEpisodeCover, getEpisodeCreated, getEpisodeTitle } from '../utils'

const episodeData = ref()
onBeforeMount(async () => episodeData.value = getEpisode(await PodcastData()))
const router = useRouter()

const isDisplay = ref('none')

const created = ep => getEpisodeCreated(ep)
const cover = ep => getEpisodeCover(ep)
const title = ep => getEpisodeTitle(ep)

const handleScroll = () => {
  if (window.scrollY > 1000)
    isDisplay.value = 'block'

  else
    isDisplay.value = 'none'
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
  <div flex="~" @scroll="handleScroll">
    <div flex-1 overflow-auto>
      <img
        v-for="ep in episodeData"
        :id="created(ep).toString()" :key="created(ep).toString()" v-lazy="cover(ep)"
        inline-block w="50%" :alt="title(ep)"
        p-1
        @click="goTo.episodeDetail(created(ep))"
      >
    </div>

    <div w="38.2%" text-26px color-white>
      <div v-for="ep in episodeData" :key="getEpisodeCreated(ep)" hover:color-black>
        <a :href="anchor(ep)">{{ title(ep) }}</a>
      </div>
    </div>
  </div>
  <div class="rd-50%" bg-black fixed text-10 bottom-5 right-5 w-20 h-20 text-center :style="{ display: isDisplay }" @click="scrollToTop">
    <div flex="~" justify-center items-center w-full h-full color-white>
      Top
    </div>
  </div>
</template>

