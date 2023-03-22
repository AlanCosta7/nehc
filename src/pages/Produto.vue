<template>
    <q-page v-if="produto">
      <q-img
        :src="banner.data.imagem_1600"
        :ratio="16/4"
        spinner-color="primary"
        spinner-size="82px"
      >
        <div class="column absolute-full text-left zindex">
          <q-toolbar class="row absolute-top z-top q-pa-md bggradiente" >
            <div class="flex flex-center">
              <q-img
                :src="logo.br"
                :ratio="16/9"
                width="100px"
                spinner-color="primary"
                spinner-size="82px"
              />
            </div>
            <q-space />
            <q-list class="row items-center mobile-hide">
              <div v-for="(item, i) in essentialLinks" :key="i">
                <div v-if="item.link">
                  <q-item clickable v-ripple @click="onRouter(item.link)">
                    <q-item-section class="text-uppercase text-white">{{item.title}}</q-item-section>
                  </q-item>
                </div>
                <div v-else>
                  <q-btn-dropdown flat color="black" :label="item.title">
                    <q-list v-for="(opc, i) in item.lista" :key="i">
                      <q-item clickable v-ripple @click="onRouter(item.title, opc.data)">
                        <q-item-section>
                          <q-item-label>{{opc.data.title}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </div>
            </q-list>
            <q-btn
              class="mobile-only"
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </q-toolbar>
          <div style="padding-left:100px; margin-top: 100px">
            <h1 class="text-center">{{ produto.data.title }}</h1>
          </div>
        </div>
      </q-img>

    <div class="q-pa-md">
      <q-breadcrumbs>
      <q-breadcrumbs-el class="text-black" :label="name[0]" :to="`/${name[0]}`" />
      <q-breadcrumbs-el class="text-black" label="produtos" :to="`/${name[0]}/produtos`" />
      <q-breadcrumbs-el class="text-primary" :label="produto.data.title" />
      </q-breadcrumbs>
    </div>

      <div class="row items-start q-pa-md q-gutter-md" style="padding-top: 100px; padding-bottom: 100px">
        <div class="col-xs-12 col-md-5 q-px-md row items-center justify-center ">
          <div class="col-xs-12 row justify-center">
            <q-carousel
              v-model="slide"
              swipeable
              animated
              infinite
              class="bg-white text-black rounded-borders"
            >
              <q-carousel-slide :name="i" v-for="(item, i) in produto.data.midia" :key="i" :img-src="item" class="cardimg" />
            </q-carousel>
          </div>
          <div class="col-12 row items-center justify-center q-gutter-md">
            <q-card class="cursor-pointer" v-for="(item, i) in produto.data.midia" :key="i" @click="slide = i" >
              <q-img width="60px" :ratio="1" :src="item" />
            </q-card>
          </div>
        </div>
        <div class="col-xs-12 col-md-6 q-px-md">
          <q-card flat>
            <q-card-section>
              <div v-html="produto.data.description"></div>
            </q-card-section>
          </q-card>
          <div></div>
        </div>
      </div>
    </q-page>
</template>

<script setup>
import { ref, computed } from "vue"
import { useGlobalStore } from 'src/store/globalStore'
import { useRoute, useRouter } from 'vue-router'
import { useMeta } from 'quasar'

const route = useRoute()
const router = useRouter()
const global = useGlobalStore()
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

let slide = ref(0)

const logo = computed(() => {
  console.log('logo:', name.value[0])
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

console.log('site', name.value[0], global.bannerProduto)

let banner = computed(() => global.bannerProduto.find(v => v.data.site == name.value[0]))

let id = computed(() => route.params.id)

let produto = computed(() => global.listaProdutos?.find((a) => a.id == id.value))

useMeta(() => {
  return {
    title: produto?.value?.data?.title,
    meta: {
      // whenever "title" from above changes, your meta will automatically update
      description: { name: 'description', content: produto?.value?.data?.description },
      keywords: { name: 'keywords', content: produto?.value?.data?.categoria },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle:  {
        property: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template () {
          return `${produto?.value?.data?.title} - Nehc ${produto?.value?.data?.site}`
        }
      },
      ogImage: {
        property: 'og:image',
        content: produto?.value?.data?.midia[0]
      },
      twitterTitle:  {
        property: 'twitter:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template () {
          return `${produto?.value?.data?.title} - Nehc ${produto?.value?.data?.site}`
        }
      },
      twitterImage: {
        property: 'twitter:image',
        content: produto?.value?.data?.midia[0]
      }
    }
  }
})

function onRouter(item, data=null) {
  if(data) {
    router.push({name: item, params: {id: data.link }})
  } else if(item == 'logout') {
    global.signOut()
  } else {
    router.push({name: item})
  }
}

function toggleLeftDrawer() {
  global.setToggleLeftDrawer(true)
}
</script>

<style scoped>
.cardimg {
  width: 70vw !important;
  max-width: 300px !important;
}

.q-carousel__control {
  z-index: 1000;
}

.q-panel > div {
  height: 0;
}
.q-carousel__slide {
  width: 80vw !important;
  min-height: 70% !important;
}

.zindex {
  z-index: 0;
}
</style>
