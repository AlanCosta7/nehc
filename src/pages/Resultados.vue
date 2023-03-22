<template>
  <q-page>
    <Search />
    <section>
      <div class="row items-start q-gutter-md justify-center">
        <div class="text-h3 col-12 text-center text-weight-thin q-my-xl">Resultados</div>
        <CardProduto color="black" label="Ver produto" v-show="item" v-for="(item, i) in resultados" :key="i" :produto="item" />
        <h6 v-show="!resultados.length">Ops!!! Não encontramos o produto</h6>
      </div>
    </section>
  </q-page>
</template>

<script setup>

import { computed } from 'vue';
import Search from 'src/components/Search.vue';
import CardProduto from 'src/components/CardProduto.vue';
import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()
let resultados = computed(() => global.resultados)
console.log('resultados', resultados.value)
</script>

<style>

</style>
