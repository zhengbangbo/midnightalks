<script setup lang="ts">
const { showReturnTop } = defineProps<{
  showReturnTop: string
}>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    z-2 cursor-pointer rd="50%"
    bg-black hover:bg-op-30 fixed text-center
    right-10 bottom-10 w-20 h-20 text-12
    :style="{ display: showReturnTop }" @click="scrollToTop"
  >
    <div flex="~" justify-center items-center w-full h-full color-white>
      Top
    </div>
  </div>
</template>
