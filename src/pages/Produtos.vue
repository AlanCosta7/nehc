<template>
  <q-page>
    <Navbar v-if="name[0] == 'utility'" />
    <div class="q-pa-md bg-grey-3">
      <q-breadcrumbs>
        <q-breadcrumbs-el class="text-black" :label="name[0]" :to="`/${name[0]}`" />
        <q-breadcrumbs-el class="text-black" label="produtos" />
      </q-breadcrumbs>
    </div>
    <Search />
    <section>
      <div class="row items-start q-gutter-md justify-center">
        <div class="text-h3 col-12 text-center text-weight-thin q-my-xl">Produtos</div>
        <CardProduto color="black" label="Ver produto" v-show="item" v-for="(item, i) in listaProdutos" :key="i" :produto="item" />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import Search from 'src/components/Search.vue';
import Navbar from 'src/components/Navbar.vue';
import CardProduto from 'src/components/CardProduto.vue';
import { useGlobalStore } from 'src/store/globalStore'
import { useRoute } from 'vue-router'

const global = useGlobalStore()
const route = useRoute()
let name = computed(() => route.name.split('-'))
let isCategoria = computed(() => global.isCategoria)

let listaProdutos = computed(() => global.listaProdutos.filter(v => {
  let validarSite = v.data.site == name.value[0]
  let cat = true

  if(isCategoria.value == v.data.categoria) {
    cat = true
  } else {
    cat = false
  }

  if(cat && validarSite) {
    return v
  }

}).sort((a,b) => {
    if ( a.data.index < b.data.index ){
      return -1;
    }
    if ( a.data.index > b.data.index ){
      return 1;
    }
    return 0;
  })
)


</script>
