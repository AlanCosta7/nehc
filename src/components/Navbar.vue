<template>
  <div class="bg-primary q-pa-none q-ma-none">
    <q-scroll-area v-if="index"  style="width: 100vw; height: 80px;" >
      <div class="row no-wrap items-center justify-center content-center text-white cursor-pointer">
        <div :class="isCategoria == item? 'bg-accent':'bg-primary'" class="col-auto flex flex-center q-pa-md" style="min-width: 100px; height: 80px" v-for="(item, index) in optionsCategoria" :key="index" clickable v-ripple @click="onRouter(item)" >
          <div>{{ item }}</div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useGlobalStore } from 'src/store/globalStore'
import { useRouter, useRoute } from 'vue-router'

const global = useGlobalStore()

const route = useRoute()
const router = useRouter()

let optionsCategoria = computed(() => global.optionsCategoria)
let isCategoria = computed(() => global.isCategoria)
let name = computed(() => route.name.split('-'))
let index = computed(() => {
  if(!isCategoria.value && name.value[1]) {
    global.setCategoria(optionsCategoria.value[0])
  } else if(!isCategoria.value || !name.value[1]) {
    global.setCategoria(null)
  }
  return true
})

function onRouter(item) {
  let link = `${name.value[0]}-produtos`
  router.push({name: link})
  global.setCategoria(item)
}


</script>

