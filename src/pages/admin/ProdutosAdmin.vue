<template>
  <div class="row justify-center relative-position">

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
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 400px">Produtos</h1>
      </div>
      <div class="row items-start justify-around">
        <div class="col-12 row items-start justify-around">
          <div class="col-xs-10 col-md-2">
            <Lista title="Lista de site" :lista="listaSite" @select="select" >
              <template v-slot="slotProps">
                <div>
                  {{slotProps.item.data.label}}
                </div>
              </template>
            </Lista>
          </div>
          <div class="col-md-8 col-xs-10 q-pa-md">
            <q-list v-if="listaProdutos.length">
              <div class="row items-center justify-between q-my-md">
                <div class="text-bold q-mb-md">Lista de produtos:</div>
                <div>
                  <q-btn v-if="siteSelect" color="primary" label="Ordenar produtos" @click="ordenarProdutos()" />
                </div>
              </div>
              <q-select v-model="produtoSelect" :options="listaProdutosSelect" label="Produtos" outlined />

              <!-- <div v-for="(item, i) in listaProdutos" :key="i">
                <q-item class="borda" clickable v-ripple @click="setForm(item)">
                  <q-item-section>{{ item.data.title }}</q-item-section>
                </q-item>
              </div> -->
            </q-list>
          </div>
        </div>
        <div class="col-md-10 col-xs-10 q-gutter-md">
          <div class="row items-start q-gutter-md">
            <div>
              <div v-if="form.data.midia.length">
                <q-carousel
                  v-model="slide"
                  transition-prev="jump-right"
                  transition-next="jump-left"
                  swipeable
                  animated
                  control-color="black"
                  prev-icon="arrow_left"
                  next-icon="arrow_right"
                  navigation-icon="radio_button_unchecked"
                  navigation
                  padding
                  arrows
                  class="bg-width text-black shadow-1 rounded-borders"
                >
                  <q-carousel-slide :name="i" v-for="(item, i) in form.data.midia" :key="i" class="column no-wrap flex-center">
                    <q-item>
                      <div class="absolute-top-right" style="right: -50px">
                        <q-btn color="negative" icon="close" round @click="onExcluir(i)" />
                      </div>
                      <div class="absolute-top-right" style="top: 60px; right: -50px">
                        <q-btn color="blue" icon="edit" round @click="onPickPhoto(i+1)" />
                      </div>
                      <q-img class="imgCover" :src="item">
                        <template v-slot:error>
                          <div class="absolute-full flex flex-center bg-negative text-white">
                            Clique aqui para add a imagem
                          </div>
                        </template>
                      </q-img>
                    </q-item>
                  </q-carousel-slide>
                </q-carousel>
              </div>

            </div>
            <div class="col-md-6 q-gutter-md">
              <div class="q-mx-md">
                <q-btn color="primary" :disable="!form.id" outline icon="add" label="adicionar nova foto" @click="onPickPhoto(null)" />
              </div>
              <div>
                <q-input outlined v-model="form.data.title" type="text" label="Título" />
              </div>
              <div>
                <q-input outlined v-model="form.data.subtitle" type="text" label="Subtítulo" />
              </div>
              <div>
                <q-input outlined v-model="form.data.link" type="text" label="link" hint="Exemplo: esse-e-o-meu-titulo" />
              </div>
              <div v-if="siteSelect.data.name == 'utility'">
                <q-select outlined v-model="form.data.categoria" :options="optionsCategoria" label="Categoria"  />
              </div>
              <div>
                <q-toggle v-model="form.data.destaque" color="positive" label="Destaque" />
              </div>
            </div>
          </div>
          <div>
            <q-editor
              v-model="form.data.description"
              ref="editorRef"
              toolbar-text-color="white"
              toolbar-toggle-color="yellow-8"
              toolbar-bg="primary"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify']
                  }
                ],
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['token'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7'
                    ]
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana'
                    ]
                  },
                  'removeFormat'
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
              }"
            >
            <template v-slot:token>
              <q-btn-dropdown dense no-caps ref="token" no-wrap unelevated color="white" text-color="primary" label="Text Color" size="sm">
                <q-list dense>
                  <q-item tag="label" clickable @click="color('backColor', highlight)">
                    <q-item-section side>
                      <q-icon name="format_color_fill" />
                    </q-item-section>
                    <q-item-section>
                      <q-color v-model="highlight" default-view="palette" no-header no-footer :palette="[
                          '#ffccccaa', '#ffe6ccaa', '#ffffccaa', '#ccffccaa',
                          '#ccffe6aa', '#ccffffaa', '#cce6ffaa', '#ccccffaa', '#e6ccffaa', '#ffccffaa', '#ff0000aa', '#ff8000aa', '#ffff00aa', '##00ff00aa', '#00ff80aa', '#00ffffaa', '#0080ffaa', '#0000ffaa', '#8000ffaa', '#ff00ffaa'
                        ]" class="my-picker" />
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" clickable @click="color('foreColor', foreColor)">
                    <q-item-section side>
                      <q-icon name="format_color_text" />
                    </q-item-section>
                    <q-item-section>
                      <q-color
                        v-model="foreColor"
                        no-header
                        no-footer
                        default-view="palette"
                        class="my-picker"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
            </q-editor>
          </div>
          <div class="row items-center justify-around">
            <div class="q-my-md">
                <div class="row items-center justify-around">
                  <div style="width:100%; max-width: 1200px">
                    <div class="row items-center justify-around q-gutter-md">
                      <div>
                        <q-btn color="negative" :disable="!form.id" icon="delete_outline" label="Excluir" @click="onDelete()" />
                      </div>
                      <div>
                        <q-btn color="amber" icon="cleaning_services" label="Limpar" @click="onReset()" />
                      </div>
                      <div>
                        <q-btn color="positive" icon="done" :disable="!validarDados" :label="form.id ? 'Atualizar':'Salvar'" @click="onSubmit()" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogOrdenarProduto" persistent>
      <q-card>
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title>
            Ordenar produtos
          </q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="row items-center">
          <Draggable v-model="listaProdutos"  class="q-gutter-md" >
            <template v-slot:item="{item}" @change="setListaProdutos()">
                <!-- example -->

                <div>
                  <q-btn color="primary" style="width: 250px" outline icon="drag_indicator" :label="item.data.title" @click="onClick" />
                </div>
                <!-- or your own template -->
            </template>
          </Draggable>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="q-py-xl"></div>
  </div>
</template>

<script setup>

import { ref, computed, watch } from "vue"
import { useGlobalStore } from 'src/store/globalStore'
import { Dialog } from "quasar";
import Lista from "src/components/Lista.vue"
import BtnAdmin from "src/components/btnAdmin.vue"
import Draggable from "vue3-draggable";
import { set } from "vue-demi";

const global = useGlobalStore()

let photoInput = ref(null)
let index = ref(0)
let slide = ref(0)
let optionsCategoria = computed(() => global.optionsCategoria)

let produtoSelect = ref(null)
let listaSite = computed(() => global.listaSite)
let siteSelect = computed(() => global.siteSelect)
let foreColor = ref('#000000')
let highlight = ref('#ffff00aa')
let editorRef = ref(null)
let dialogOrdenarProduto = ref(false)
let token = ref(null)

let listaProdutos = computed({
  get() {
    return global.listaProdutos.filter(v => v.data.site == siteSelect.value?.data?.name).map((v, i) => {
      return {
        collection: v.collection,
        id: v.id,
        data: {
          description: v.data.description,
          destaque: v.data.destaque,
          index: v.data.index,
          link: v.data.link,
          midia: v.data.midia,
          site: v.data.site,
          subtitle: v.data.subtitle,
          title: v.data.title,
          categoria: v.data.categoria
        }
      }
    }).sort((a,b) => {
      if ( a.data.index < b.data.index ){
        return -1;
      }
      if ( a.data.index > b.data.index ){
        return 1;
      }
      return 0;
    })
  },
  set(val) {
    console.log(val)
    val.forEach((v, i) => {
      v.data.index = i
      global.updateDocs(v)
    });

  }
})

let listaProdutosSelect = computed(() => listaProdutos.value.map((v)=> {
  return {
    label: v.data.title,
    value: v
  }
}))

let form = ref({
  id: null,
  data: {
    site: siteSelect.value?.data?.name||null,
    title: null,
    subtitle: null,
    link: null,
    destaque: false,
    description: null,
    midia: [],
    index: null,
    categoria: null
  }
})

console.log('form', form.value, siteSelect.value)


let validarDados = computed(() => {
  let isForm = form.value.data
  if(isForm?.title && isForm?.subtitle && isForm?.description ) {
    return true
  } else {
    return false
  }
})

watch(produtoSelect, async (newDoc, oldDoc) => {
  if(newDoc) {
    form.value = newDoc.value
  }

  console.log('produtoSelect', form.value.data.midia.length)
})

function setForm(item) {
  form.value = item || {}
}

function onReset() {
  produtoSelect.value = null
  form.value = {
    id: null,
    data: {
      site: siteSelect.value?.data?.name,
      title: null,
      subtitle: null,
      link: null,
      destaque: false,
      description: null,
      midia: [],
      index: null,
      categoria: null
    }
  }
}

async function onSubmit() {
  if(siteSelect.value?.data?.name) {
    if(form.value.id) {
      let val = {
        collection: 'produtos',
        data: {
          site: siteSelect.value?.data?.name,
          title: form.value.data.title,
          subtitle: form.value.data.subtitle,
          link: form.value.data.link,
          destaque: form.value.data.destaque,
          description: form.value.data.description,
          index: form.value.data.index,
          categoria: form.value.data.categoria
        },
        id: form.value.id
      }
      await global.updateDocs(val)
      onReset()
    } else {
      let val = {
        collection: 'produtos',
        data: {
          site: siteSelect.value?.data?.name,
          title: form.value.data.title,
          subtitle: form.value.data.subtitle,
          link: form.value.data.link,
          destaque: form.value.data.destaque,
          midia: [],
          description: form.value.data.description,
          index: listaProdutos.value.length,
          categoria: form.value.data.categoria
        }
      }
      await global.saveDocs(val)
      onReset()
    }
  } else {
    Dialog.create({
      title: "Selecione o site"
    })
  }
}

function onPickPhoto(i) {
  index.value = i ? i : form.value.data.midia.length?form.value.data.midia.length+1:1
  if(form.value.id) {
    photoInput.value.click();
  } else {
    Dialog.create({
      title: "Crie primeiro um Produto e adicione em seguida a imagem"
    })
  }
}

function onPhotoURLPicked(event) {
  const files = event.target.files;
  const file = files[0];
  const id = form.value.id
  const i = index.value
  console.log('form', form)
  var value = {
    id: id,
    type: null,
    collection: 'produtos',
    files: file,
    page: null,
    index: i
  }
  console.log('onPhotoURLPicked', value)
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    form.value.data.midia[i-1] = base64
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
      collection: 'produtos',
      id: form.value.id
    }
    await global.deleteDocs(val)
    onReset()
  })
}

function onExcluir(i) {
  Dialog.create({
    title: "Atenção!!!",
    message: "Tem certeza que deseja excluir esse item? Essa ação é irreversível",
    cancel: true,
    persistent: true
  })
  .onOk(async () => {
    form.value.data.midia.splice(i, 1)
    console.log('onExcluir', form.value)

    let val = {
      collection: 'produtos',
      data: {
        site: form.value.data.site,
        title: form.value.data.title,
        subtitle: form.value.data.subtitle,
        link: form.value.data.link,
        midia: form.value.data.midia,
        destaque: form.value.data.destaque,
        description: form.value.data.description,
        index: form.value.data.index,
        categoria: form.value.data.categoria
      },
      id: form.value.id
    }
    await global.updateDocs(val)
  })
}

function select(item) {
  global.setSite(item)
}

function color (cmd, name) {
  const edit = editorRef.value
  token.value.hide()
  edit.caret.restore()
  edit.runCmd(cmd, name)
  edit.focus()
}

function ordenarProdutos(item) {
  dialogOrdenarProduto.value = true
}

function setListaProdutos() {
  console.log('mudou')
}
</script>

<style>
.imgCover {
  object-fit: cover;
  width: 300px;
  height: 300px;
}
.my-picker {
  max-width: 250px
}
</style>
