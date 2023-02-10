<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePodcastStore } from '../stores'
import type { episode } from '../utils'
import { fixedCoverUrl } from '../utils'

const props = defineProps(['created'])
const router = useRouter()

const podcastStore = usePodcastStore()
const detail = ref<episode>()
onBeforeMount(
  async () => {
    await podcastStore.getPodcastData()
    const items = podcastStore.podcastData.items
    const created_list = items.map(items => items.created)
    const index = created_list.indexOf(parseInt(props.created))
    if (index >= 0)
      detail.value = items[index]
    else
      router.replace('/')
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
