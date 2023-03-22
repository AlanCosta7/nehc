<template>
  <q-parallax v-if="banner && banner.data && banner.data.imagem_1600" :height="700">
    <template v-slot:media>
      <img :src="banner.data.imagem_1600" />
    </template>

    <template v-slot:content="scope">
      <div
        class="absolute column items-center"
        :style="{
          top: scope.percentScrolled * 60 + '%',
          left: 0,
          right: 0,
        }"
      >
      <div class="row items-center justify-start">
        <div class="col-10 q-pa-md">
            <div class="text-h4 mobile-hide text-white q-mb-xl text-weight-bolder text-uppercase" style="max-width:800px">{{ banner.data.title }}</div>
            <div class="text-h5 mobile-only text-white q-mb-xl text-weight-bolder text-uppercase" style="max-width:800px">{{ banner.data.title }}</div>
            <div v-if="banner.data.link">
              <q-btn @click="onRouter(banner.data.link)" rounded outline style="width: 150px" :color="color" :label="label"  />
            </div>
        </div>
        <q-space class="col-4" />
      </div>
      </div>
    </template>
  </q-parallax>
</template>

<script setup>
import { computed } from "vue";
import { openURL } from "quasar";
import { useGlobalStore } from 'src/store/globalStore'
const props = defineProps(["color", "label", "banner"]);
const global = useGlobalStore()

const banner = computed(() => props.banner);
const color = computed(() => props.color);
const label = computed(() => props.label);

function onRouter(item) {
  if(item) {

    openURL(item)
  }
}
</script>

<style>
</style>
