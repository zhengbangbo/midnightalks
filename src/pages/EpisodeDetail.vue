<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useHead } from '@vueuse/head'
import { usePodcastStore } from '../stores'
import type { episode } from '../utils'
import { fixedCoverUrl } from '../utils'

const props = defineProps(['created'])
const router = useRouter()
const $loading = useLoading()

const podcastStore = usePodcastStore()
const detail = ref<episode>()

onBeforeMount(
  async () => {
    if (!podcastStore.podcastData.title) {
      const loader = $loading.show()
      await podcastStore.getPodcastData().then(() => {
        loader.hide()
      })
    }

    const items = podcastStore.podcastData.items
    const created_list = items.map(items => items.created)
    const index = created_list.indexOf(parseInt(props.created))
    if (index >= 0)
      detail.value = items[index]
    else
      router.replace('/')

    useHead({
      title: detail.value?.title,
      meta: [
        { name: 'description', content: detail.value?.description },
        { name: 'keywords', content: detail.value?.title },
      ],
    })
  },
)
</script>

<template>
  <div flex flex-col w-full h-full justify-center items-center>
    <a href="#title">
      <img
        :src="fixedCoverUrl(detail?.itunes_image.href, true)"
      >
    </a>

    <div id="title" text-14 text-white p-2 pt-10>
      {{ detail?.title }}
    </div>
    <div text-6 text-white p-8 v-html="detail?.description" />
  </div>
</template>
