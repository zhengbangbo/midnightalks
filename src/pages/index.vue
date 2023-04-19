<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { usePodcastStore } from '../stores'
import type { episode } from '../utils'
import { fixedCoverUrl } from '../utils'

const podcastStore = usePodcastStore()
const episodeData = ref<episode[]>()
const $loading = useLoading()

onBeforeMount(
  async () => {
    if (!podcastStore.podcastData.items) {
      const loader = $loading.show()
      await podcastStore.getPodcastData().then(() => {
        loader.hide()
      })
    }
    episodeData.value = podcastStore.podcastData.items
  },
)
const router = useRouter()

onMounted(() => {
  // 微信浏览器中，路由跳转新页面不会自动到顶部
  router.afterEach(() => { window.scrollTo(0, 0) })
})

const showReturnTop = ref('none')

const handleScroll = useDebounceFn(() => {
  if (window.scrollY > 1000)
    showReturnTop.value = 'block'

  else
    showReturnTop.value = 'none'
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
        :id="created.toString()" :key="created.toString()" v-lazy="fixedCoverUrl(itunes_image?.href)"
        inline-block lg:w="50%" :alt="created.toString()"
        p-1
        @click="goTo.episodeDetail(created)"
      >
    </div>

    <div w="38.2%" text-18px lg:text-26px color-white pr-1>
      <div v-for="{ created, title } in episodeData" :key="created" hover="color-black op-80" lg:pl-5 pt-3>
        <a :href="anchor(created)">{{ title }}</a>
      </div>
    </div>
  </div>
  <div
    z-2
    cursor-pointer class="rd-50%"
    bg-black hover:bg-op-30 fixed text-6 lg:text-10 bottom-5 right-5 w-12 lg:w-20 h-12 lg:h-20 text-center :style="{ display: showReturnTop }" @click="scrollToTop"
  >
    <div flex="~" justify-center items-center w-full h-full color-white>
      Top
    </div>
  </div>
</template>

