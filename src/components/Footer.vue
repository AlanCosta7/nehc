<template>
  <q-footer class="bg-dark">
    <div class="row items-start justify-between q-gutter-md q-pa-xl" >
      <div class="col-xs-10 col-sm-2" style="width:80vw; max-width:300px">
        <h6>Siga-nos</h6>
        <div class="row items-center justify-start">
          <q-list v-show="item.link" v-for="(item, index) in listaSocial" :key="index" class="col-auto">
            <q-item clickable v-ripple @click="onRouter(item)" >
              <div class="row items-center justify-start">
                <q-item-section avatar>
                  <q-img
                    :src="item.img_br"
                    :ratio="1"
                    width="30px"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </q-item-section>
              </div>
            </q-item>
          </q-list>
        </div>
      </div>
      <div v-for="(item, i) in listaContato" :key="i" style="width:80vw; max-width:300px">
        <h6 class="text-uppercase	">{{ item.data.title }}</h6>
        <div class="row items-center q-gutter-md" v-for="(opc, i) in item.data.contatos" :key="i">
          <q-icon v-if="opc.icon.value !== 'whatsapp' " :name="opc.icon.value" />
          <q-img
            v-else
            src="../assets/whatsapp.png"
            :ratio="1"
            width="15px"
            spinner-color="primary"
            spinner-size="82px"
          />
          <div>{{ opc.text }}</div>
        </div>
      </div>
    </div>
    <div class="row items-center q-pa-xl">
      <div class="q-py-xl">
        <q-img
          :src="logo.br"
          width="120px"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>
      <q-space />
      <div>
        <div>2022 © Todos os Direitos Reservados | <a href="./">Política de Privacidade</a></div>
      </div>
    </div>
  </q-footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useGlobalStore } from 'src/store/globalStore'
import { openURL } from 'quasar'
const global = useGlobalStore()
const route = useRoute()

let name = computed(() => route.name.split('-'))
let listaContato = computed(() => global.listaContatoSuporte)

let listaSocial = computed(() => global.listaSocial?.data)

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

function onRouter(item) {
  if(item.link) {
    openURL(item.link)
  }
}

</script>

<style lang="scss" scoped>
h6 {
  color: $accent;
}

a {
  text-decoration: none;
  color: white;
}
</style>
