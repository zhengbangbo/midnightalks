<script setup lang="ts">
import { useHead } from '@vueuse/head'
import BaseLayout from './layout/BaseLayout.vue'

const headDefault = {
  title: '大内密谈',
  meta: [
    { name: 'description', content: '快速浏览《大内密谈》的往期精美封面' },
    { name: 'keywords', content: 'Podcast, Chinese, Music' },
  ],
}

const useUmami = {
  script: [
    {
      'src': 'https://u.imzbb.cc/u.js',
      'async': true,
      'defer': true,
      'data-website-id': '18ce7a3b-77df-42cf-aa9f-f7114d0cc053',
    },
  ],
}

// <script async defer data-website-id="18ce7a3b-77df-42cf-aa9f-f7114d0cc053" src="https://u.imzbb.cc/u.js"/>
useHead(
  process.env.NODE_ENV === 'production'
    ? { ...headDefault, ...useUmami }
    : { ...headDefault },
)
</script>

<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<style scoped>
</style>
