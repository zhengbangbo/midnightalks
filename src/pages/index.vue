<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, onBeforeMount, onMounted, onUnmounted, ref, vModelCheckbox } from 'vue'
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
</script>

<template>
  <div flex="~ col" justify-center items-center @scroll="handleScroll">
    <div>
      <input
        v-model="searchText" placeholder="输入关键词进行搜索" op-50
        w-100 h-10 p-2 m-2 text-2xl rounded @keyup.enter="search"
      >
      <label for="withDescription">包含描述</label>
      <input v-model="withDescription" name="withDescription" type="checkbox" @change="search">
    </div>
    <div v-if="searchEpisodeData" text="#eee">
      共得到 {{ searchResultCount }} 个搜索结果
    </div>
    <div v-if="searchEpisodeData" grid grid-cols-2 bg="#eee" bg-op-20 rd-2 gap-2 p-2>
      <div
        v-for="{ created, itunes_image, title } in searchEpisodeData"
        :id="created.toString()" :key="created.toString()" w-150 h-150 relative
      >
        <CoverCard :created="created" :itunes_image="itunes_image" :title="title" :go-to="goTo.episodeDetail" />
      </div>
    </div>
    <div grid grid-cols-2 p-2 gap-2>
      <div
        v-for="{ created, itunes_image, title } in episodeData"
        :id="created.toString()" :key="created.toString()" w-150 h-150 relative
      >
        <CoverCard :created="created" :itunes_image="itunes_image" :title="title" :go-to="goTo.episodeDetail" />
      </div>
      <div
        z-2 cursor-pointer class="rd-50%" bg-black hover:bg-op-30 fixed text-6 lg:text-10 bottom-5 right-5 w-12 lg:w-20
        h-12 lg:h-20 text-center :style="{ display: showReturnTop }" @click="scrollToTop"
      >
        <div flex="~" justify-center items-center w-full h-full color-white>
          Top
        </div>
      </div>
    </div>
  </div>
</template>

