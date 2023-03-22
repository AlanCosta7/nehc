<template>
  <q-layout view="hhh lpR fff">
    <q-header >
      <q-toolbar class="bg-black">
        <q-toolbar-title>
          Admin
        </q-toolbar-title>
        <q-btn color="white" flat icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      v-if="currentUser"
      bordered
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="300"
      :breakpoint="500"
      class="bg-grey-3"
    >
      <q-list>
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
        <q-item>
          <q-item-section top avatar>
            <q-btn flat icon="logout" label="Deslogar" @click="onRouter('logout')" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { openURL, Loading } from 'quasar'
import { ref, onMounted, computed, watch } from 'vue'
import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()
let currentUser = computed(() => global.currentUser)
let miniState = ref(true)
watch(currentUser, async (newDoc, oldDoc) => {
  redirectToApp()
})

const essentialLinks = [
  {
    title: 'Site',
    link: 'site',
    icon: 'language'
  },
  {
    title: 'Paginas',
    link: 'pages-admin',
    icon: 'description'
  },
  {
    title: 'Faixa paralax',
    link: 'faixa-paralax-admin',
    icon: 'panorama'
  },
  {
    title: 'Banner',
    link: 'banner-admin',
    icon: 'panorama'
  },
  {
    title: 'Banner Home',
    link: 'banner-home-admin',
    icon: 'panorama'
  },
  {
    title: 'Banner Produto',
    link: 'banner-produto',
    icon: 'panorama'
  },
  {
    title: 'Quem somos',
    link: 'banner-institucional-admin',
    icon: 'store'
  },
  {
    title: 'Produtos',
    link: 'produtos-admin',
    icon: 'shopping_bag'
  },
  {
    title: 'Suporte',
    link: 'suporte-admin',
    icon: 'support_agent'
  },
  {
    title: 'Redes sociais',
    link: 'social',
    icon: 'people'
  }
];

const leftDrawerOpen = computed({
  get() {
    return global.leftDrawerOpen
  },
  set() {
    toggleLeftDrawer()
  }
})
const router = useRouter()

function toggleLeftDrawer() {
  global.setToggleLeftDrawer()
}

async function onRouter(item, data=null) {
  if(item == 'beneficios') {
    await global.setBeneficios(data)
    this.router.push({name: item, params: {id: data.link }})
  } else if(item == 'logout') {
    global.signOut()
  } else {
    this.router.push({name: item})
  }
}

function sendWhatsapp() {
  global.onWhatsapp()
}

function redirectToApp() {
  Loading.show({
    message: '<h3>Carregando...</h3>',
    html: true
  })

  if(!currentUser.value) {
    setTimeout(() => {
      Loading.hide();
      router.push({name: 'auth'})
    }, 3000);
  } else {
    setTimeout(() => {
      Loading.hide();
      router.push({name: 'pages-admin'})
      global.getAdmin()
    }, 3000);
  }

}

onMounted(async() => {
  await global.isOnAuthStateChanged()
  redirectToApp()
  let listaColl = ['suporte', 'suporte-info', 'pages', 'faixa-paralax', 'banner-home', 'banner-institucional', 'banner', 'produtos', 'site', 'banner-produto']
  listaColl.forEach(element => {
    global.onLoadCollections({collection: element})
  });
  global.getSocial()
})

</script>

<style>
.bg-transparent {
  background-color: transparent;
}
</style>
