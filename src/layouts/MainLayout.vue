<template>
  <q-layout view="hhh lpR fff">
    <q-header v-if="!contextoIndex && !contextoProduto || contextoInicio" color="transparent" class="bgtransparent">
      <Header :img="banner" title="Esse é o título" subtitle="eu sou o subtítulo" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="mobile || !contextoIndex"
      bordered
    >
      <q-list>
        <q-img
          src="https://firebasestorage.googleapis.com/v0/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2F1_400x400.webp?alt=media&token=85e1699c-4487-40ce-b104-0af712e72fe9"
          :ratio="1"
          class="z-top"
          spinner-color="primary"
          spinner-size="82px"
        />
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <Footer v-if="!contextoIndex" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useGlobalStore } from 'src/store/globalStore'

export default {
  preFetch ({store}) {
    const global = useGlobalStore()

    console.log('running preFetch')
    let listaColl = ['suporte', 'suporte-info', 'pages', 'faixa-paralax', 'banner-home', 'banner-institucional', 'banner', 'produtos', 'site', 'banner-produto']
    listaColl.forEach(element => {
      return global.onLoadCollections({collection: element})
    })
  }
}
</script>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import Footer from 'components/Footer.vue'
import Header from 'src/components/Header.vue';
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useGlobalStore } from 'src/store/globalStore'

const route = useRoute()

const global = useGlobalStore()
let mobile = computed(() => global.mobile)
let banner = computed(() => global.banner)
let name = computed(() => route.name.split('-'))

let essentialLinks = computed(() => [
  {
    title: 'Conheça mais produtos',
    link: 'home'
  },
  {
    title: 'Início',
    link: name.value[0]
  },
  {
    title: 'Quem somos',
    link: `${name.value[0]}-institucional`
  },
  {
    title: 'Produtos',
    link: `${name.value[0]}-produtos`
  },
  {
    title: 'Suporte',
    link: `${name.value[0]}-suporte`
  }
])

const contextoIndex = computed(() => {
  return route.name == 'home' ? true : false
})

const contextoProduto = computed(() => {
  console.log('route.name', route.name, name.value[0])
  return route.name == `${name.value[0]}-produto` ? true : false
})

const contextoInicio = computed(() => {
  return route.name == `${name.value[0]}` ? true : false
})

const leftDrawerOpen = computed({
  get() {
    return global.leftDrawerOpen
  },
  set() {
    toggleLeftDrawer()
  }
})

function toggleLeftDrawer() {
  global.setToggleLeftDrawer()
}

async function onRouter(item, data=null) {
  if(data) {
    await global.setBeneficios(data)
    router.push({name: item, params: {id: data.link }})
  } else {
    router.push({name: item})
  }
}

onMounted(async() => {
  await global.isOnAuthStateChanged()
  global.getSocial()
})
</script>

<style>
.bgtransparent {
  background-color: transparent;
}
</style>
