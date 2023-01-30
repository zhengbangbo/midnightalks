<script setup lang="ts">
</script>

<template>
  <div class="flex">
    <div class="grow">
      <slot />
    </div>
  </div>
  <DeclarationBanner ref="banner" />
</template>
