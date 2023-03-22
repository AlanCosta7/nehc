<template>
  <div v-if="currentUser" class="row justify-center relative-position">
    <div style="width:80vw; max-width: 1200px">
      <div>
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 600px">Site</h1>
      </div>
      <div>
        <Lista title="Lista de site" :lista="listaSite" @select="select" >
          <template v-slot="slotProps">
            <div>
              {{slotProps.item.data.label}}
            </div>
          </template>
        </Lista>
      </div>
      <div class="q-gutter-md q-my-xl">
        <div>
          <q-input v-model="form.data.label"  outlined type="text" label="Nome do site" />
        </div>
        <div>
          <q-input v-model="form.data.name" disable outlined type="text" label="nickname" />
        </div>
        <div>
          <q-input v-model="form.data.img" outlined type="text" label="link da imagem" />
        </div>
      </div>
      <div>
        <BtnAdmin :form="form" collection="site" @onReset="onReset" :validarDados="validarDados" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import Lista from "src/components/Lista.vue"
import BtnAdmin from "src/components/btnAdmin.vue"

import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()
let listaSite = computed(() => global.listaSite)
let currentUser = computed(() => global.currentUser)
let siteSelect = computed(() => global.siteSelect)

let form = ref({
  id: null,
  data: {
    name: null,
    label: null,
    img: null
  }
})

let validarDados = ref(false)

watch(
  () => form,
  async (newDoc, oldValue) => {

    if(newDoc.value.data.name) {
      validarDados.value = true
      console.log(validarDados.value)
    } else {
      validarDados.value = false
      console.log(validarDados.value)
    }
  },
  { deep: true }
)

function select(item) {
  global.setSite(item)
  form.value = siteSelect.value
}

function onReset() {
  form.value = {
    id: null,
    data: {
      name: null,
      label: null,
      img: null
    }
  }
}

onMounted(() => {
  if(siteSelect.value) {
    form.value = siteSelect.value
  }
})
</script>

<style>

</style>
