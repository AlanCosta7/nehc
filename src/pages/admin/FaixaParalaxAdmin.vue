<template>
  <div v-if="currentUser" class="row justify-center relative-position">

    <input
      ref="photoInput"
      debounce="500"
      type="file"
      @change="onPhotoURLPicked"
      name="photo"
      style="display: none;"
      accept="image/*"
    />
    <div style="width:80vw; max-width: 1200px">
      <div>
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 600px">Faixa Paralax</h1>
      </div>
      <div class="row items-start justify-around">
        <div class="col-md-2 col-xs-10 q-gutter-md">
          <Lista title="Lista de site" :lista="listaSite" @select="select" >
            <template v-slot="slotProps">
              <div>
                {{slotProps.item.data.label}}
              </div>
            </template>
          </Lista>
        </div>
        <div class="col-md-10 col-xs-10 q-gutter-md">
          <div class="row items-start q-gutter-md">
            <div>
              <q-img width="300px" v-if="form.id" height="300px" :src="form.data.imagem_1600" @click="onPickPhoto" class="cursor-pointer">
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-negative text-white">
                    Clique aqui para add a imagem do benefício
                  </div>
                </template>
              </q-img>
            </div>
            <div class="col-md-6 q-gutter-md">
              <div>
                <q-input outlined v-model="form.data.title" type="text" label="Título" />
              </div>
              <div>
                <q-input outlined v-model="form.data.label" type="text" label="Texto do botão" hint="Baixar catálogo" />
              </div>
              <div>
                <q-input outlined v-model="form.data.link" type="text" label="link" hint="Exemplo: esse-e-o-meu-titulo" />
              </div>
            </div>
          </div>
          <div class="row items-center justify-around">
            <div>
              <BtnAdmin :form="form" collection="faixa-paralax" @onReset="onReset" :validarDados="validarDados" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-py-xl"></div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted, watch } from "vue"
import { useGlobalStore } from 'src/store/globalStore'
import { Dialog } from "quasar";
import Lista from "src/components/Lista.vue"
import BtnAdmin from "src/components/btnAdmin.vue"

const global = useGlobalStore()
let photoInput = ref(null)
let currentUser = computed(() => global.currentUser)

let listaSite = computed(() => global.listaSite)
let siteSelect = computed(() => global.siteSelect)
let bannerFaixaParalax = computed(() => global.bannerFaixaParalax)

watch(siteSelect, async (newDoc, oldDoc) => {
  if(newDoc) {
    form.value = bannerFaixaParalax.value.find((v) => v.data.site == newDoc.data.name) || {
      id: null,
      data: {
        title: null,
        label: null,
        link: null,
        site: newDoc.data.name,
        imagem_200: './',
        imagem_400: './',
        imagem_600: './',
        imagem_800: './',
        imagem_1600: './',
      }
    }
  }
})

let form = ref({
  id: null,
  data: {
    title: null,
    label: null,
    link: null,
    site: null,
    imagem_200: './',
    imagem_400: './',
    imagem_600: './',
    imagem_800: './',
    imagem_1600: './',
  }
})

let file = ref(null)

let validarDados = computed(() => {
  let isForm = form.value.data
  if(isForm?.title ) {
    return true
  } else {
    return false
  }
})

function setForm(item) {
  form.value = item || {}
}

function addPage() {
  form.value = {
    id: null,
    data: {
      title: null,
      label: null,
      link: null,
      site: siteSelect.value.data.name,
      imagem_200: './',
      imagem_400: './',
      imagem_600: './',
      imagem_800: './',
      imagem_1600: './',
    }
  }
}

function onReset() {
  form.value = {
    id: null,
    data: {
      title: null,
      label: null,
      link: null,
      site: null,
      imagem_200: './',
      imagem_400: './',
      imagem_600: './',
      imagem_800: './',
      imagem_1600: './',
    }
  }
  select(null)
}

async function onSubmit() {

  form.value.data.site = siteSelect.value.data.name
  if(form.value.id) {
    let val = {
      collection: 'faixa-paralax',
      data: form.value.data,
      id: form.value.id
    }
    await global.updateDocs(val)
    onReset()
  } else {
    let val = {
      collection: 'faixa-paralax',
      data: form.value.data
    }
    await global.saveDocs(val)
    onReset()
  }
}

function onPickPhoto() {
  if(form.value.id) {
    photoInput.value.click();
  } else {
    Dialog.create({
      title: "Crie primeiro um Benefício e adicione em seguida a imagem"
    })
  }
}

function onPhotoURLPicked(event) {
  const files = event.target.files;
  const file = files[0];
  const id = form.value.id
  console.log('form', form)
  var value = {
    id: id,
    collection: 'faixa-paralax',
    type: 'paralax',
    page: null,
    index: null,
    files: file,
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    form.value.data.imagem_1600 = base64
  })

  fileReader.readAsDataURL(file)

  global.uploadPhotoURL(value)

}

async function onDelete() {
  Dialog.create({
    title: "Atenção!!!",
    message: "Tem certeza que deseja excluir esse item? Essa ação é irreversível",
    cancel: true,
    persistent: true
  })
  .onOk(async () => {
    let val = {
      collection: 'faixa-paralax',
      id: form.value.id
    }
    await global.deleteDocs(val)
    onReset()
  })

}

function select(item) {
  global.setSite(item)
}


onMounted(() => {
  if(siteSelect.value) {
    form.value = bannerFaixaParalax.value.find((v) => v.data.site == siteSelect.value.data.name) || {
      id: null,
      data: {
        title: null,
        label: null,
        link: null,
        site: siteSelect.value.data.name,
        imagem_200: './',
        imagem_400: './',
        imagem_600: './',
        imagem_800: './',
        imagem_1600: './',
      }
    }
  }
})
</script>

<style>

</style>
