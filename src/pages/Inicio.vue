<template>
  <q-page>
    <Navbar v-if="name[0] == 'utility'" />
    <Search />
    <!-- <ListaSite /> -->
    <ProdutosDestaque />
    <Banner class="q-my-xl q-pa-none q-mx-none" v-if="banner" :link="banner.data.link" :img="banner.data.imagem_1600" />
    <Faixa v-if="bannerHome" :banner="bannerHome" color="primary" label="Ver mais" />
    <FaixaParalax v-if="bannerFaixaParalax" :banner="bannerFaixaParalax" color="white" label="Baixar catálogo" />
    <div class="row justify-center relative-position" style="margin-top:100px; margin-bottom: 100px">
      <q-img
        :src="logo.pr"
        width="300px"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import Search from 'src/components/Search.vue';
import ProdutosDestaque from 'src/components/ProdutosDestaque.vue';
import Banner from 'src/components/Banner.vue';
import Faixa from 'src/components/Faixa.vue';
import FaixaParalax from 'src/components/FaixaParalax.vue';
import ListaSite from 'src/components/ListaSite.vue';
import Navbar from 'src/components/Navbar.vue';
import { useGlobalStore } from 'src/store/globalStore'
import { useRoute } from 'vue-router'

const route = useRoute()
let name = computed(() => route.name.split('-'))

const global = useGlobalStore()
let banner = computed(() => global.banner.find(v => v.data.site == route.name))
let bannerHome = computed(() => global.bannerHome.find(v => v.data.site == route.name))
let bannerFaixaParalax = computed(() => global.bannerFaixaParalax.find(v => v.data.site == route.name))

const logo = computed(() => {
  switch (name.value[0]) {
    case 'surround':
      return {
        br: 'https://storage.googleapis.com/download/storage/v1/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FLOGO%20NEHC%20SURROUND%20ATUAL%20BRANCA_200x200.webp?generation=1674157167672153&alt=media',
        pr: 'https://storage.googleapis.com/download/storage/v1/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FLOGO%20NEHC%20SURROUND%20ATUAL%20PRETA_400x400.webp?generation=1674157170116543&alt=media'
      }
    case 'security':
      return {
        br: 'https://storage.googleapis.com/download/storage/v1/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FLOGO%20SECURITY%20BRANCA_200x200.webp?generation=1674157168822419&alt=media',
        pr: 'https://storage.googleapis.com/download/storage/v1/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FLOGO%20SECURITY%20PRETA_800x800.webp?generation=1674157168637183&alt=media'
      }
    case 'utility':
      return {
        br: 'https://storage.googleapis.com/download/storage/v1/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FNEHC%20UTILITY%20BRANCO_800x800.webp?generation=1674157172106213&alt=media',
        pr: 'https://storage.googleapis.com/download/storage/v1/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FNEHC%20UTILITY%20PRETO_600x600.webp?generation=1674157168177928&alt=media'
      }
    default:
      break;
  }
})
</script>
