<template>
  <div v-if="banner" class="row items-start justify-around q-gutter-md q-pa-xl">
    <div class="row justify-start col" style="max-width: 800px" >
      <h3>{{ banner.data.title }}</h3>
      <div v-html="banner.data.subtitle">
      </div>
      <div class="q-my-xl" v-if="banner.data.link">
        <q-btn @click="onRouter(banner.data.link)" rounded :color="color" style="width: 150px" :label="label"  />
      </div>
    </div>
    <div class="col-auto row justify-center">
      <q-img
        :src="banner.data.imagem_600"
        :ratio="1"
        class="rounded-borders"
        width="300px"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>
  </div>

</template>

<script setup>
import { computed } from "vue"
import { openURL } from "quasar";

const props = defineProps(['banner', 'color', 'label'])

const banner = computed(() => props.banner)
const color = computed(() => props.color)
const label = computed(() => props.label)

function onRouter(item) {
  if(item) {
    openURL(item)
  }
}
</script>

<style>

</style>
