<template>
  <div class="q-pa-md bg-grey-3 row items-center full-with">
    <q-space class="col-lg-3 col-md-2 col-sm-auto col-xs-auto" />
    <div class="col-lg-7 col-md-7 col-sm-10 col-xs-10">
      <q-select
        use-input
        hide-selected
        fill-input
        input-debounce="1000"
        hide-dropdown-icon
        v-model="search"
        type="text"
        @filter="filterProdutos"
        bg-color="white"
        rounded
        dense
        outlined
        label="Pesquisar..." >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { openURL } from "quasar";
import { useGlobalStore } from '../store/globalStore'
import { useRouter, useRoute } from 'vue-router'

const global = useGlobalStore()
const router = useRouter()
const route = useRoute()
const autoplay = ref(true)
const search = ref()
const listaProdutos = computed(() => global.listaProdutos.sort((a,b) => {
    if ( a.data.index < b.data.index ){
      return -1;
    }
    if ( a.data.index > b.data.index ){
      return 1;
    }
    return 0;
  })
)

let name = computed(() => route.name.split('-'))

function filterProdutos(val, update, abort) {

  console.log('filterProdutos val', val)
  if (val.length < 3 ) {
    abort()
    return;
  } else {
    update(() => {
      const needle = val.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
      let lista = []

      for (let i = 0; i < listaProdutos.value.length; i++) {
        const element = listaProdutos.value[i];
        let title = element.data.title.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').indexOf(needle) > -1

        if (title) {
          lista.push(element)
        }
      }
      console.log('filterProdutos lista', lista)
      global.setResultados(lista)
      router.push({name: `${name.value[0]}-resultado`})
    });

  }
}

</script>

<style>

</style>
