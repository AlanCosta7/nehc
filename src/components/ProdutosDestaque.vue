<template>
  <div class="row items-start q-gutter-md q-pa-md justify-center">
    <div class="text-h3 col-12 text-center text-weight-thin q-my-xl">Produtos em Destaque</div>
    <div v-if="listaProdutos.length" class="row items-center justify-center q-gutter-md">
      <CardProduto color="black" label="Ver produto" v-show="item && item.data && item.data.destaque" v-for="(item, i) in listaProdutos" :key="i" :produto="item" />
    </div>
    <div class="col-12 row justify-center q-my-xl">
      <q-btn color="primary" label="Ver mais produtos" @click="onRouter()" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue-demi'
import CardProduto from "../components/CardProduto.vue"
import { useGlobalStore } from '../store/globalStore'
import { useRouter, useRoute } from 'vue-router'

const global = useGlobalStore()
const router = useRouter()
const route = useRoute()

let name = computed(() => route.name.split('-'))
const listaProdutos = computed(() => global.listaProdutos.filter(v => v.data.site == name.value[0]).sort((a,b) => {
    if ( a.data.index < b.data.index ){
      return -1;
    }
    if ( a.data.index > b.data.index ){
      return 1;
    }
    return 0;
  })
)

function onRouter() {
  router.push({name: `${name.value[0]}-produtos` })
}

</script>

