<script setup lang="ts">
const { id } = defineProps<{ id: string }>()
</script>

<template>
  <div flex="~" justify-center w-full>
    episode {{ id }}
  </div>
</template>

<style scoped>

</style>
