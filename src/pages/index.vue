<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { usePodcastStore } from '../stores'
import type { episode } from '../utils'

const podcastStore = usePodcastStore()
const episodeData = ref<episode[]>()
const searchText = ref('')
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

// 搜索过滤后的数据
const searchEpisodeData = ref()

const withDescription = ref(false)

const searchResultCount = computed(() => {
  return searchEpisodeData.value?.length
})

const search = () => {
  if (searchText.value === '') { searchEpisodeData.value = null }

  else {
    searchEpisodeData.value = episodeData.value?.filter((item) => {
      if (withDescription.value)
        return item.title?.toLowerCase().includes(searchText.value.toLowerCase()) || item.description?.toLowerCase().includes(searchText.value.toLowerCase())

      return item.title?.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }
}

const searchFocus = ref(false)
</script>

<template>
  <div flex="~ col" justify-center items-center w-full @scroll="handleScroll">
    <div
      flex="~ row" items-center
      w-100 h-10 p-2 m-2 text-2xl rd-10 b-2 bg-white
      :class="searchFocus ? 'op-100' : 'op-50'"
    >
      <div i-carbon-search />
      <input
        v-model="searchText" placeholder="搜索大内密谈"
        focus-visible-outline-none p-1
        font-sans
        bg-transparent w-full @keyup.enter="search" @focus="searchFocus = true" @blur="searchFocus = false"
      >
    </div>
    <div v-if="searchEpisodeData" text="#eee">
      共得到 {{ searchResultCount }} 个搜索结果
      (<label for="withDescription">包含描述</label>
      <input v-model="withDescription" name="withDescription" type="checkbox" @change="search">)
    </div>
    <CardContainer v-if="searchEpisodeData" container w-full :episode-data="searchEpisodeData" :go-to="goTo" m-2 bg="#eee" rd-2 />
    <CardContainer container w-full :episode-data="episodeData" :go-to="goTo" />
    <ReturnTop :show-return-top="showReturnTop" />
  </div>
</template>

