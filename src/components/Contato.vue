<template>
<div>
  <div style="margin-top: 100px; margin-bottom: 50px" class="row justify-center">
    <div style="max-width: 80vw" class="col-12 text-left">
      {{ msg }}
    </div>
    <div class="col-12 row items-start justify-around q-gutter-md">
      <div v-for="(item, i) in listaContatoSuporte" :key="i">
        <h6 class="text-uppercase	">{{ item.data.title }}</h6>
        <div class="row items-center q-gutter-md" v-for="(opc, i) in item.data.contatos" :key="i">
          <q-icon v-if="opc.icon.value !== 'whatsapp' " :name="opc.icon.value" />
          <q-img
            v-else
            src="../assets/whatsapppr.png"
            :ratio="1"
            width="15px"
            spinner-color="primary"
            spinner-size="82px"
          />
          <div>{{ opc.text }}</div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top: 100px; margin-bottom: 50px" class="row justify-center">
    <div style="width:80vw; max-width: 1200px">
      <div>
        <h1 class="primaryGradiente text-uppercase text-weight-bolder" style="width:80vw; max-width: 600px">{{ title }}</h1>
      </div>
      <div class="row items-start justify-around q-gutter-md">
        <div class="col-xs-12 col-md-5">
          <iframe :src="map" class="iframe" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="col-xs-12 col-md-5">
          <Form text="Estamos prontos para resolver seu problema. Entre em contato conosco:" :dark="true" />
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Form from 'src/components/Form.vue'
import { useRoute } from 'vue-router'

import { useGlobalStore } from 'src/store/globalStore'
const global = useGlobalStore()
const props = defineProps(["title", "msg", "img", "map"]);
const route = useRoute()

let listaContatoSuporte = computed(() => global.listaContatoSuporte)

let title = computed(() => props.title)
let msg = computed(() => props.msg)
let img = computed(() => props.img)
let map = computed(() => props.map)


</script>

<style>
.iframe {
  width: 80vw;
  max-width: 500px;
  height: 90vh;
  max-height: 500px;
}
</style>
