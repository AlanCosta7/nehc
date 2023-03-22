<template>
  <div class="column q-my-md justify-center flex flex-center">
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
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 600px">Banner</h1>
      </div>
      <div class="row col-10 q-gutter-md" >
        <div class="col-xs-10 col-md-2">
          <Lista title="Lista de site" :lista="listaSite" @select="select" >
            <template v-slot="slotProps">
              <div>
                {{slotProps.item.data.label}}
              </div>
            </template>
          </Lista>
        </div>
        <div class="col-xs-10 col-md-8 q-gutter-md">
          <q-img @click="onPickPhoto" v-if="form.id" class="cursor-pointer" width="100%" :ratio="12/6" :src="form.data.imagem_800" >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Clique aqui para add a imagem
              </div>
            </template>
          </q-img>
          <div>
            <q-input outlined v-model="form.data.link" type="text" label="Link" />
          </div>
          <div class="col-10 row items-center justify-around q-my-md q-gutter-md">
            <div class="row items-center justify-around">
              <div>
                <BtnAdmin :form="form" collection="banner" @onReset="onReset" :validarDados="true " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Loading, Dialog} from 'quasar'
import { useRouter } from 'vue-router'
import { useGlobalStore } from 'src/store/globalStore'
import Lista from "src/components/Lista.vue"
import BtnAdmin from "src/components/btnAdmin.vue"

const router = useRouter()
const global = useGlobalStore()

let photoInput = ref(null)
let banner = computed(() => global.banner)
let listaSite = computed(() => global.listaSite)
let siteSelect = computed(() => global.siteSelect)

let form = ref({
  id: null,
  data: {
    link: null,
    site: null,
    imagem_200: './',
    imagem_400: './',
    imagem_600: './',
    imagem_800: './',
    imagem_1600: './',
  }
})

watch(siteSelect, async (newDoc, oldDoc) => {
  console.log('newDoc', newDoc)
  if(newDoc) {
    form.value = banner.value.find((v) => v.data.site == newDoc.data.name) || {
      id: null,
      data: {
        link: null,
        site: newDoc?.data?.name,
        imagem_200: './',
        imagem_400: './',
        imagem_600: './',
        imagem_800: './',
        imagem_1600: './',
      }
    }
  }
})


function onReset() {
  form.value = {
    id: null,
    data: {
      link: null,
      site: siteSelect.value?.data?.name,
      imagem_200: './',
      imagem_400: './',
      imagem_600: './',
      imagem_800: './',
      imagem_1600: './',
    }
  }
  select(null)
}

function onPickPhoto() {
  photoInput.value.click();
}

function onPhotoURLPicked(event) {
  const files = event.target.files;
  const file = files[0];
  const id = form.value.id
  console.log('banner', form)
  var value = {
    id: id,
    collection: 'banner',
    type: 'banner',
    page: null,
    index: null,
    files: file,
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    form.value.data.imagem_800 = base64
  })

  fileReader.readAsDataURL(file)

  global.uploadPhotoURL(value)

}

function select(item) {
  global.setSite(item)
}
</script>

<style>

</style>
