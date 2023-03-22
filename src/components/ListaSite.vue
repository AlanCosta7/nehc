<template>
  <div class="bg-grey-3 q-py-xl">
    <div>
      <div class="text-h3 col-12 text-center text-weight-thin q-py-xl">Conheça outras linhas de produtos</div>
    </div>
    <q-list class="row items-center justify-center q-gutter-md" >
      <q-card v-show="name !== item.data.name" v-for="(item, index) in listaSite" :key="index" class="cursor-pointer" style="width: 90vw; max-width:200px" @click="onRouter(item)">
        <img :src="item.data.img">
        <q-card-section>
          <div class="text-h6 text-uppercase text-center">{{ item.data.label }}</div>
        </q-card-section>
      </q-card>
    </q-list>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()
let listaSite = computed(() => global.listaSite)
const router = useRouter()
const route = useRoute()

let name = computed(() => route.name)


function onRouter(item) {
  router.push({name: item.data.name})
}
</script>

<style>

</style>
