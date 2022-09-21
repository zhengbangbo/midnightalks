<script setup lang="ts">

</script>

<template>
  <div
    class="badge"
    flex="~ row gap-2"
    items-center justify-center px-1 py-2 text-sm font-400 border-rounded h-24px
  >
    <slot name="icon" />
  </div>
</template>

<style scoped>
.badge {
  color: var(--text-color);
  background-color: var(--badge-bg);
}
</style>
