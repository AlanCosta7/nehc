<template>
  <div>
    <div>
      <div v-if="header == 'simples' " class="full-width relative-position" >
        <q-toolbar class="row z-top q-pa-md bggradiente" >

          <div class="flex flex-center">
            <q-img
              :src="logo.br"
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
            v-if="mobile"
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>
        <div class="row items-center justify-around" style="margin-top: 100px; margin-bottom: 100px">
          <div class="col-sm-5 text-black q-pa-md">
            <h1 class="text-weight-bolder text-uppercase text-left">{{ contextHome.data.lista[0].title }}</h1>
            <h2 class="text-weight-bolder text-uppercase">{{ contextHome.data.lista[0].subtitle }}</h2>
            <div>
              <q-btn color="white" outline v-if="contextHome.data.lista[0].link" :label="contextHome.data.lista[0].label" @click="open(contextHome.data.lista[0].link)"  />
            </div>
          </div>
          <div class="col-sm-5 q-pa-md">
            <q-img
              :src="contextHome.data.lista[0].midia"
              width="80vw"
              style="max-width:550px"
              spinner-color="primary"
              spinner-size="82px"
            />
          </div>
        </div>
      </div>
      <div v-if="header == 'imagem' && contextHome" class="full-width relative-position">
        <q-img
          :src="contextHome.data.lista[0].midia"
          width="100vw"
          height="80vh"
          spinner-color="primary"
          spinner-size="82px"
        >
          <div v-if="contextHome" class="column absolute-full text-left">
            <q-toolbar class="row absolute-top z-top q-pa-md bggradiente" >
              <div class="flex flex-center">
                <q-img
                  :src="logo.br"
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
                v-if="mobile"
                flat
                dense
                round
                icon="menu"
                aria-label="Menu"
                @click="toggleLeftDrawer"
              />
            </q-toolbar>
            <div class="q-pa-md" style="padding-left:10%; margin-top: 100px">
              <h1>{{ contextHome.data.lista[0].title }}</h1>
              <h2>{{ contextHome.data.lista[0].subtitle }}</h2>
              <div>
                <q-btn color="white" outline v-if="contextHome.data.lista[0].link" :label="contextHome.data.lista[0].label" @click="open(contextHome.data.lista[0].link)"  />
              </div>
            </div>
          </div>
        </q-img>
      </div>
      <div v-if="img && header == 'carousel'">
        <q-toolbar class="row absolute-top z-top q-pa-md bggradiente" >
          <div>
            <q-img
              :src="logo.br"
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
            v-if="mobile"
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>
        <!-- <q-responsive class="responsive" :ratio="20/10"> -->
          <q-carousel
            animated
            v-model="slide"
            :navigation="!mobile"
            infinite
            width="100vw"
            height="80vh"
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
              <q-carousel-slide class="cursor-pointer" v-for="(item, i) in contextHome.data.lista" :key="i" :name="i" :img-src="item.midia" >
                <div v-if="item" class="column text-left q-pa-md" style="padding-left:10%; margin-top: 100px">
                  <h1>{{ item.title }}</h1>
                  <h2>{{ item.subtitle }}</h2>
                  <div>
                    <q-btn color="white" outline v-if="item.link" :label="item.label" @click="open(item.link)"  />
                  </div>
                </div>
              </q-carousel-slide>
          </q-carousel>
        <!-- </q-responsive> -->
      </div>
      <div v-if="header == 'video'" class="relative-position">
        <q-toolbar class="row absolute-top z-top q-pa-md" >
          <div>
            <q-img
              :src="logo.br"
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
            v-if="mobile"
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>
        <div v-if="contextHome" >
          <video autoplay muted loop id="bgvideo">
            <source :src="contextHome.data.lista[0].midia" type="video/mp4">
          </video>
          <div class="content flex flex-center column text-left q-pa-md" style="padding-left:10%; margin-top: 100px">
            <div class="column text-left" style="width: 90vw; max-width: 1200px">
              <h1>{{ contextHome.data.lista[0].title }}</h1>
              <h2>{{ contextHome.data.lista[0].subtitle }}</h2>
              <div>
                <q-btn color="white" outline v-if="contextHome.data.lista[0].link" :label="contextHome.data.lista[0].label" @click="open(contextHome.data.lista[0].link)"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import anime from 'animejs/lib/anime.es.js';
import { onMounted, computed, ref } from 'vue'
import { openURL } from 'quasar'
import { useGlobalStore } from '../store/globalStore'
import { useRouter, useRoute } from 'vue-router'

const global = useGlobalStore()
const router = useRouter()
const route = useRoute()

const props = defineProps(['title', 'subtitle', 'img'])
let dark = computed(() => props.dark)
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

const listaPages = computed(() => global.listaPages)

const contextHome = computed(() => {
  let namer = route.name
  let result = listaPages.value.find(v => v.data?.link.toLowerCase() == namer.toLowerCase())
  console.log('result', namer, listaPages.value)
  if(result) {
    return result
  }
  return listaPages.value.find(v => v.data?.link == name.value[0])
})

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

let slide = ref(1)
let autoplay = ref(true)
let mobile = computed(() => global.mobile)
let desktop = computed(() => global.desktop)
let header = computed(() => contextHome?.value?.data?.type)

function open(item) {
  if(item) {
    openURL(item)
  }
}

function onRouter(item, data=null) {
  global.setCategoria(null)
  if(data) {
    router.push({name: item, params: {id: data.link }})
  } else if(item == 'logout') {
    global.signOut()
  } else {
    router.push({name: item})
  }
}

function toggleLeftDrawer() {
  global.setToggleLeftDrawer()
}

onMounted(() => {
  if(mobile.value) {

    anime({
      targets: '.easing',
      translateX: -200,
      easing: 'easeInOutExpo'
    });
  } else {

    anime({
      targets: '.easing',
      translateX: -700,
      easing: 'easeInOutExpo'
    });
  }
  anime({
    targets: '.arrow',
    translateY: 30,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutQuad'
  })
})

</script>

<style scoped>
#dimmer {
  background:#000;
  opacity:0.5;
  position:fixed; /* important to use fixed, not absolute */
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: -1;

}
.bgcard {
  background: rgba(3, 4, 117, 0.3)
}

.easing {
  margin-left: 600px;
  transition: all 1s ease-out;
}

.textOpacity {
  animation: isOpacity 2s ;
}

@keyframes isOpacity {
  from {opacity: 0;}
  to {opacity: 1px;}
}


@media only screen and (max-width: 600px) {
  .easing {
    margin-left: 50px;
    transition: all 1s ease-out;
  }
}

.isDesktop {
  margin-top: 120px;
  height: 80vh
}

.isMobile {
  margin-top: 60px;
  height: 50vh
}

.bggradiente {
  background: linear-gradient(180deg, rgba(0,0,0,0.6433167016806722) 0%, rgba(0,0,0,0) 100%);
}

#bgvideo {
  z-index: 0;
  object-fit: cover;
  width:100%;
  height:80vh;
}

.content {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
