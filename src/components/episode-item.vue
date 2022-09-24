<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { useRouter } from 'vue-router'
import type { Episode } from '../typing/types'

const { info } = defineProps<{
  info: Episode
}>()

const router = useRouter()

const date = $computed(() => format(info.date, 'yyyy-MM-dd'))
const handleClick = () => {
  router.push({
    path: `/episodes/${info.id}`,
  })
}
</script>

<template>
  <div
    flex="~ col"
    max-w-lg
    items-center rounded class="episode-item"
  >
    <h2 text-20px font-500 class="title" p-2 cursor-pointer @click="handleClick">
      {{ info.title }}
    </h2>
    <div flex="~ row gap-2">
      <badge>
        <template #icon>
          <div i-carbon-calendar />
          {{ date }}
        </template>
      </badge>
      <badge>
        <template #icon>
          <div i-carbon-user-speaker />
          {{ info.hosts.join(', ') }}
        </template>
      </badge>
      <badge>
        <template #icon>
          <div i-carbon-user-multiple />
          {{ info.guests.join(', ') }}
        </template>
      </badge>
    </div>

    <span class="description" p-2>
      {{ info.description }}
    </span>
  </div>
</template>

<style scoped>
.episode-item {
  border: 1px dashed var(--border-color);
  overflow: hidden;
}
.title {
  color: var(--text-color)
}
.description {
  color: var(--text-color);
}
</style>
