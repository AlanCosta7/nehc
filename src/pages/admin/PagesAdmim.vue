<template>
  <div v-if="currentUser" class="relative-position">
    <input
      ref="photoInput"
      debounce="500"
      type="file"
      @change="onPhotoURLPicked"
      name="photo"
      style="display: none;"
      accept="*"
    />

    <div>
      <div>
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 400px">Páginas</h1>
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
        <div class="col-md-8 col-xs-10 q-gutter-md">
          <div class="items-start q-gutter-md">
            <div class="column q-my-md">
              <ListaPag title="Selecione uma página" />
            </div>

            <div class="q-my-md">
              <div class="text-bold q-mb-md">Editar página</div>
              <q-item v-if="form && form.data && form.data.page" class="column items-center q-gutter-md">
                <q-card style="width:100%">
                  <q-toolbar class="bg-purple text-white">
                    <q-toolbar-title>
                      <div>Prévia da Capa</div>
                    </q-toolbar-title>
                  </q-toolbar>
                  <q-card-section v-if="form.data.type == 'video'">
                    <div v-if="form.data.lista.length" class="relative-position">
                      <video autoplay muted loop id="video" style="width: 100%; max-height: 400px">
                        <source :src="form.data.lista[0].midia" type="video/mp4">
                      </video>
                      <div class="content flex flex-center column text-left" style="padding-left:100px; margin-top: 100px">
                        <div class="column text-left z-top" style="width: 100%">
                          <h1>{{ form.data.lista[0].title }}</h1>
                          <h2>{{ form.data.lista[0].subtitle }}</h2>
                          <div>
                            <q-btn color="white" outline v-if="form.data.lista[0].link" :label="form.data.lista[0].label" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section v-if="form.data.type == 'imagem'">
                    <div v-if="form.data.lista.length" class="relative-position">
                      <q-img
                        :src="form.data.lista[0].midia"
                        width="100%"
                        spinner-color="primary"
                        spinner-size="82px"
                      >
                        <template v-slot:error>
                          <div class="absolute-full flex flex-center bg-negative text-white">
                          </div>
                        </template>
                      </q-img>
                      <div class="content flex flex-center column text-left" style="padding-left:100px; margin-top: 100px">
                        <div class="column text-left z-top" style="width: 100%">
                          <h1>{{ form.data.lista[0].title }}</h1>
                          <h2>{{ form.data.lista[0].subtitle }}</h2>
                          <q-btn color="primary" outline v-if="form.data.lista[0].link" :label="form.data.lista[0].label" />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section v-if="form.data.type == 'carousel'">
                    <div v-if="form.data.lista.length" class="relative-position">
                      <q-responsive class="responsive" :ratio="12/5">
                        <q-carousel
                          animated
                          v-model="slide"
                          :navigation="!mobile"
                          infinite
                          :autoplay="autoplay"
                          transition-prev="slide-right"
                          transition-next="slide-left"
                          @mouseenter="autoplay = false"
                          @mouseleave="autoplay = true"
                        >
                          <q-carousel-slide class="cursor-pointer" v-for="(item, i) in img" :key="i" :name="i" :img-src="form.data.lista[i].midia" >
                            <div v-if="item" class="column text-left" style="padding-left:100px; margin-top: 100px">
                              <h1>{{ item.title }}</h1>
                              <h2>{{ item.subtitle }}</h2>

                              <q-btn color="primary" outline v-if="item.link" :label="item.label" />
                            </div>
                          </q-carousel-slide>
                        </q-carousel>
                      </q-responsive>
                    </div>
                  </q-card-section>
                  <q-card-section v-if="form.data.type == 'simples'">
                    <div v-if="form.data.lista.length" class="row relative-position items-start justify-around">
                      <div class="col-sm-5 text-black z-top">
                        <h3 class="text-weight-bolder text-uppercase text-left">{{ form.data.lista[0].title }}</h3>
                        <h5 class="text-weight-bolder text-uppercase">{{ form.data.lista[0].subtitle }}</h5>
                        <q-btn color="primary" outline v-if="form.data.lista[0].link" :label="form.data.lista[0].label" />
                      </div>
                      <div class="col-sm-6 relative-position">
                        <q-img
                          class="easing absolute"
                          :src="form.data.lista[0].midia"
                          width="80vw"
                          style="max-width:450px"
                          spinner-color="primary"
                          spinner-size="82px"
                        >
                          <template v-slot:error>
                            <div class="absolute-full flex flex-center bg-negative text-white">
                            </div>
                          </template>
                        </q-img>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section v-if="!form.data.type">
                    <q-card class="my-card">
                      <q-img
                        src="../"
                        :ratio="16/9"
                        width="100%"
                        spinner-color="primary"
                        spinner-size="82px"
                      >
                      <template v-slot:error>
                        <div class="absolute-full flex flex-center bg-negative text-white">

                        </div>
                      </template>
                      </q-img>
                    </q-card>
                  </q-card-section>
                </q-card>

                <q-item-section style="width:100%" class="column">
                  <div class="row items-center q-gutter-md q-my-md">
                    <div class="text-subtitle1 text-bold line-height">
                      <q-input outlined style="width: 300px" disable v-model="form.data.site" type="text" label="Nome do site" />
                    </div>
                    <div class="text-subtitle1 text-bold line-height">
                      <q-input outlined style="width: 300px" disable v-model="form.data.link" type="text" label="Link" />
                    </div>
                  </div>
                  <div class="text-subtitle1 text-bold line-height">
                    <q-input outlined style="width: 300px" @update:model-value="formatValue" v-model="form.data.page" type="text" label="Nome da página" />
                  </div>
                  <div class="text-subtitle1 q-my-md text-bold line-height">
                    <q-select style="width: 300px" v-model="form.data.type" :options="optionsType" label="Tipo de capa" outlined />
                  </div>
                  <div class="text-subtitle1 text-bold line-height q-my-md">
                    <div>Lista de mídias do carrocel:</div>
                    <q-list bordered v-for="(opc, ind) in form.data.lista" :key="ind">
                      <q-item v-if="opc" class="q-my-md row items-center full-width" >
                        <q-item-section v-if="form.id" class="col-auto">
                          <video v-if="form.data.type == 'video'" id="video-type" @click="onPickPhoto(ind)" autoplay muted loop class="bgvideo cursor-pointer">
                            <source :src="opc.midia" type="video/mp4">
                          </video>
                          <q-img v-else :src="opc.midia" @click="onPickPhoto(ind)" class="bgvideo cursor-pointer">
                            <template v-slot:error>
                              <div class="absolute-full flex flex-center bg-negative text-white">
                                Clique aqui para add uma mídia
                              </div>
                            </template>
                          </q-img>
                        </q-item-section>
                        <q-item-section class="col q-gutter-md">
                          <div class="text-subtitle1 text-bold line-height">
                            <q-input outlined v-model="opc.title" type="text" label="Título" />
                          </div>
                          <div class="text-subtitle1 text-bold line-height">
                            <q-input outlined v-model="opc.subtitle" type="text" label="Sub Título" />
                          </div>
                          <div class="text-subtitle1 text-bold line-height">
                            <q-input outlined v-model="opc.label" type="text" label="Texto do botão" />
                          </div>

                          <div>
                            <div><b>Anexo:</b></div>
                            <div v-if="opc.link">
                              <div class=" q-pa-md" >
                                <a :href="opc.link" target="_blank" rel="noopener noreferrer">Catálogo</a>
                              </div>

                            </div>
                            <div>
                              <q-file outlined v-model="anexoFiles" label="Adicione mais imagens">
                                <template v-slot:prepend>
                                  <q-icon name="attach_file" />
                                </template>

                                <template v-slot:after>
                                  <q-btn round dense flat icon="send" @click="sendAnexo()" />
                                </template>
                              </q-file>
                            </div>
                          </div>
                          <div>
                            <q-btn color="negative" outline icon="remove" label="remover mídia" @click="remove(form.data.lista, ind)" />
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-item-section>
                <q-item-section class="col-12">
                  <div class="row items-center q-gutter-md">
                    <div class="col-auto">
                      <q-btn size="sm" color="blue" icon="add" label="Adicionar mídia" @click="addCarousel(form.data.lista)" />
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </div>

          <div v-if="form" class="row items-center justify-around">
            <div class="col">
              <q-btn color="blue" icon="add" label="Adicionar nova página" @click="addPage" />
            </div>
            <div class="col-auto">
              <BtnAdmin :form="form" collection="pages" @onReset="onReset" :validarDados="validarDados" />
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
import ListaPag from "src/components/ListaPage.vue"
import BtnAdmin from "src/components/btnAdmin.vue"

const global = useGlobalStore()

let listaSite = computed(() => global.listaSite)
let pageSelect = computed(() => global.pageSelect)
let siteSelect = computed(() => global.siteSelect)

let photoInput = ref(null)
const optionsType = ref(['video', 'imagem', 'carousel', 'simples'])

let index = ref(0)
let currentUser = computed(() => global.currentUser)
let listaPages = computed(() => global.listaPages?.sort((a, b) => a.data?.index - b.data?.index))

let slide = ref(1)
let anexoFiles = ref(null)
let autoplay = ref(true)
let mobile = computed(() => global.mobile)
let desktop = computed(() => global.desktop)

watch(pageSelect, async (newDoc, oldDoc) => {
  if(newDoc) {
    form.value = listaPages.value.find((v) => v.data?.link == newDoc.value)
  }
})

watch(siteSelect, async (newDoc, oldDoc) => {
  onReset()
})

let file = ref(null)
let lista = computed({
  get() {
    return listaPages
  },
  set(val) {
    global.setListaBeneficio(val)
  }
})

let form = ref({
  id: null,
  data: {
    page: '',
    site: '',
    type: '',
    link: '',
    lista: [
      {
        title: '',
        subtitle: '',
        link: '',
        label: '',
        midia: []
      }
    ],
    index: listaPages.value.length
  }
})

let validarDados = computed(() => {
  let isForm = form.value.data
  if(isForm?.page && isForm?.type && isForm?.link ) {
    return true
  } else {
    return false
  }
})

function onReset() {
  form.value = {
    id: null,
    data: {
      page: '',
      site: '',
      type: '',
      link: '',
      lista: [
        {
          title: '',
          subtitle: '',
          link: '',
          label: '',
          midia: []
        }
      ],
      index: listaPages.value.length
    }
  }

  global.setPages(null)
}

function addPage() {
  form.value = {
  id: null,
  data: {
    page: 'newpage',
    site: siteSelect.value.data.name,
    type: 'imagem',
    link: '',
    lista: [
      {
        title: 'New Page',
        subtitle: '',
        link: '',
        label: '',
        midia: []
      }
    ],
    index: listaPages.value.length
  }
}
}

function onPickPhoto(i) {
  index.value = i
  if(form.value.id) {
    photoInput.value.click();
  } else {
    Dialog.create({
      title: "Crie primeiro uma página e adicione em seguida a imagem"
    })
  }
}

async function onPhotoURLPicked(event) {
  const files = event.target.files;
  const file = files[0];
  const id = form.value.id
  const type = form.value.data.type
  const i = index.value+1
  var value = {
    id: id,
    type: type,
    collection: 'pages',
    files: file,
    page: form.value.data.page,
    index: i
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    if(type !== 'video') {
      form.value.data.lista[i].midia = base64
    }
  })
  fileReader.readAsDataURL(file)

  global.uploadPhotoURL(value)
  onReset()
}

function remove(item, i) {
  console.log('remove', item, i)
  item.splice(i, 1)
}

function selectItem(item) {
  form.value = item
  document.getElementById('video').load();
  document.getElementById('video-type').load();

}

function addCarousel(lista) {
  lista.push({
    title: '',
    subtitle: '',
    link: '',
    label: '',
    midia: []
  })
}

function formatValue(item) {

  form.value.data.link = item == 'home' ? form.value.data.site : `${form.value.data.site}-${item}`
  let needle = item.toLowerCase().replace(/ /g, "")
  const parsed = needle.normalize("NFD").replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
  return parsed
}

function select(item) {
  console.log('select', item)
  global.setSite(item)
}

// ajustar aqui
async function sendAnexo() {
  var value = {
    id: form.value.id,
    collection: 'pages',
    type: 'anexo',
    files: anexoFiles.value,
  }
  await global.uploadPhotoURL(value)
  anexoFiles.value = null
}

onMounted(() => {
  if(siteSelect.value) {
    form.value = listaPages.value.find((v) => v.data?.link == siteSelect.value)
    select(form.value)
  } else {
    select(listaSite.value[0])
  }
})
</script>

<style>

.bgvideo {
  z-index: 0;
  object-fit: cover;
  width: 445px;
  height: 250px;
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
