<template>
  <q-img
    @click="onRouter(link)"
    :src="img"
    :ratio="16/6"
    width="100vw"
    spinner-color="primary"
    spinner-size="82px"
  />
</template>

<script setup>
import { computed } from "vue"
import { openURL } from "quasar";

const props = defineProps(['img', 'link'])

const img = computed(() => props.img)
const link = computed(() => props.link)

function onRouter(item) {
  if(item) {
    openURL(item)
  }
}
</script>

<style>

</style>
