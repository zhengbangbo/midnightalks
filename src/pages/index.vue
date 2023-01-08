<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { PodcastData } from '../apis'
import { getEpisode, getEpisodeCover, getEpisodeCreated, getEpisodeTitle } from '../utils'

const episodeData = ref()
onBeforeMount(async () => episodeData.value = getEpisode(await PodcastData()))
</script>

<template>
  <div class="body">
    <div class="cover">
      <img
        v-for="ep in episodeData" :key="getEpisodeCreated(ep)" v-lazy="getEpisodeCover(ep)"
        :alt="getEpisodeTitle(ep)"
      >
    </div>

    <div class="episode">
      <div v-for="ep in episodeData" :key="getEpisodeCreated(ep)">
        {{ getEpisodeTitle(ep) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
}

.cover {
  flex: 1;
}

.cover img {
  display: inline-block;
  width: 48%;
  padding: 10px;
}

.episode {
  width: 500px;
  padding-top: 20px;

  font-family: "Smiley Sans";
  font-style: italic;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;

  color: #fff;
}

.episode div:hover {
  color: #000;
  cursor: pointer;
}
</style>
