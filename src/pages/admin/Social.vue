<template>
  <div class="row justify-center">
    <div class="row justify-between items-center">
      <div>
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 600px">Redes sociais</h1>
      </div>
      <div>
        <q-btn color="positive" icon="check" label="Salvar" @click="onSalvar" />
      </div>
    </div>
    <div v-if="listaSocial.id" class="column bg-grey-5" style="width:80vw; max-width: 1200px">
      <q-list >
        <q-item v-for="(item, i) in listaSocial.data" :key="i" class="column borda q-ma-md">
          <q-item-section>
            <div class="text-h6">{{ item.label }}</div>
          </q-item-section>
          <div class="row items-center q-gutter-md q-pa-xl">
            <q-item-section avatar>
              <q-img
                :src="item.img_br"
                :ratio="1"
                width="30px"
                spinner-color="primary"
                spinner-size="82px"
              />
            </q-item-section>
            <q-item-section avatar>
              <q-img
                :src="item.img_pr"
                :ratio="1"
                width="30px"
                spinner-color="primary"
                spinner-size="82px"
              />
            </q-item-section>
          </div>
          <q-item-section>
            <q-input outlined color="white" bg-color="positive" v-model="item.link" type="text" label="Link" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGlobalStore } from 'src/store/globalStore'
const global = useGlobalStore()

let listaSocial = computed(() => global.listaSocial)

function onSalvar() {
  global.setSocial()
}
</script>

<style>
.borda {
  border: 1px solid #fff ;
}
</style>
