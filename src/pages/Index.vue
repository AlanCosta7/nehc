<template>
  <div class="q-py-xl bgGradienteGrey">
    <div  class="row items-center justify-center q-gutter-md">
      <div class="col-10 row items-center justify-center" style="margin-top: 100px; margin-bottom: 100px">
        <q-img
          src="https://firebasestorage.googleapis.com/v0/b/nehc-tec.appspot.com/o/logo%2Fthumbs%2FNEHC%20HOME%20PRETA_200x200.webp?alt=media&token=a22c1b8e-234e-4b60-b3b2-9d9425df3316"
          :ratio="25/10"
          width="200px"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>
      <div class="q-pa-md">
        <h1 class="q-pa-none q-ma-none">Conheça nossa linha de produtos</h1>
        <h3 class="text-weight-light text-uppercase">Os melhores produtos para sua necessidade</h3>
      </div>
    </div>
    <div style="margin-top: 50px; margin-bottom: 50px">
      <q-list class="row items-center justify-center q-gutter-md" >
        <q-card v-for="(item, index) in listaSite" :key="index" class="cursor-pointer" style="width: 90vw; max-width:300px" @click="onRouter(item)">
          <img :src="item.data.img">
          <q-card-section>
            <div class="text-h6 text-uppercase text-center">{{ item.data.label }}</div>
          </q-card-section>
        </q-card>
      </q-list>

    </div>
    <div class=" row items-center justify-center" style="margin-top: 50px; margin-bottom: 50px">
      <div class="row items-center justify-center" style="max-width: 400px">
        <q-list v-for="(item, index) in listaSocial" :key="index" >
          <q-item v-if="item.link" clickable v-ripple @click="onOpen(item)" >
            <div class="row items-center justify-center">
              <q-item-section >
                <q-img
                  :src="item.img_pr"
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
        <div class="col-12 text-center q-pa-md">
          2022 © Todos os Direitos Reservados | Política de Privacidade
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import facebook from '../assets/facebook_pr.png'
import instagram from '../assets/instagram_pr.png'
import linkedin from '../assets/linkedin_pr.png'
import whatsapp from '../assets/whatsapppr.png'
import { useGlobalStore } from 'src/store/globalStore'
import { openURL } from 'quasar'

const global = useGlobalStore()

const router = useRouter()
let listaSite = computed(() => global.listaSite)
let listaSocial = computed(() => global.listaSocial?.data)

function onRouter(item) {
  router.push({name: item.data.name})
}

function onOpen(item) {
  openURL(item.link)
}

</script>

<style>
.bgGradienteGrey {
  background: rgb(180,180,180);
  background: -moz-linear-gradient(215deg, rgba(180,180,180,1) 17%, rgba(237,237,237,1) 81%);
  background: -webkit-linear-gradient(215deg, rgba(180,180,180,1) 17%, rgba(237,237,237,1) 81%);
  background: linear-gradient(215deg, rgba(180,180,180,1) 17%, rgba(237,237,237,1) 81%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#b4b4b4",endColorstr="#ededed",GradientType=1);
}
</style>
