<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePodcastStore } from '../stores'
import type { episode } from '../utils'
import { fixedCoverUrl } from '../utils'

const podcastDate = usePodcastStore()
const episodeData = ref<episode[]>()
onBeforeMount(
  async () => {
    await podcastDate.getPodcastData()
    episodeData.value = podcastDate.podcastData.items
  },
)
const router = useRouter()

const isDisplay = ref('none')

const handleScroll = useDebounceFn(() => {
  if (window.scrollY > 1000)
    isDisplay.value = 'block'

  else
    isDisplay.value = 'none'
}, 200)
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const anchor = (created: number) => `#${created}`
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
    <div flex-1 overflow-auto p-3>
      <img
        v-for="{ created, itunes_image } in episodeData"
        :id="created.toString()" :key="created.toString()" v-lazy="fixedCoverUrl(itunes_image.href)"
        inline-block w="50%" :alt="created.toString()"
        p-1
        @click="goTo.episodeDetail(created)"
      >
    </div>

    <div w="38.2%" text-26px color-white>
      <div v-for="{created, title } in episodeData" :key="created" hover:color-black pl-5 pt-3>
        <a :href="anchor(created)">{{ title }}</a>
      </div>
    </div>
  </div>
  <div
    z-2
    cursor-pointer class="rd-50%"
    bg-black hover:bg-blue fixed text-10 bottom-5 right-5 w-20 h-20 text-center :style="{ display: isDisplay }" @click="scrollToTop"
  >
    <div flex="~" justify-center items-center w-full h-full color-white>
      Top
    </div>
  </div>
</template>

