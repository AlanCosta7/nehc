<template>
  <div class="row justify-center fit bg-grey-3">
    <div class="q-gutter-y-md q-mt-xl" style="max-width: 1000px; width: 90vw">
      <h1>Suporte</h1>
      <q-card>
        <q-card-section class="q-gutter-sm">
          <div class="q-my-md">
            <div class="text-bold">Título:</div>
            <div class="text-subtitle1 text-bold line-height">
              <q-input outlined v-model="form.data.title" type="text" label="Título" />
            </div>
          </div>
          <div class="q-my-md">
            <q-list v-for="(item, i) in form.data.contatos" :key="i">
              <div class="text-bold">Contatos:</div>
              <q-item class="row items-center q-gutter-md">
                <q-item-section class="col">
                  <div class="text-subtitle1 text-bold line-height">
                    <q-select v-model="item.icon" :options="optionsIcon" label="Ícone" outlined />
                  </div>
                </q-item-section>
                <q-item-section class="col">
                  <div class="text-subtitle1 text-bold line-height">
                    <q-input outlined v-model="item.text" type="text" label="Título" />
                  </div>
                </q-item-section>
                <q-item-section class="col-2">
                  <div>
                    <q-btn color="negative" outline icon="remove" round @click="removeContato(i)" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div>
            <div>
              <q-btn color="blue" icon="add" label="Adicionar contato" @click="addContato" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <div class="row items-center justify-around">
            <BtnAdmin :form="form" collection="suporte" @onReset="onReset" :validarDados="validarDados" />
          </div>
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-my-xl" style="max-width: 1000px; width: 90vw">
      <div>Lista de <b>contatos para suporte: {{ listaContatoSuporte.length }}</b></div>
      <q-list bordered class="rounded-borders" >
        <draggable v-model="myList">
          <template v-slot:item="{item}">
            <q-expansion-item
                expand-separator
                class="full-width"
                icon="drag_indicator"
                header-class="bg-white"
                :label="`${item.data.ordem} - ${item.data.title}`"
              >
                <q-card class="bg-grey-3">
                  <q-card-section class="cursor-pointer" @click="setselectDuvida(item)">
                    <div v-for="(opc, i) in item.data.contatos" :key="i">
                      <div class="row items-center q-gutter-md">
                        <div>
                          <q-icon v-if="opc.icon.value !== 'whatsapp' " :name="opc.icon.value" />
                          <q-img
                            v-else
                            :src="whatsapp"
                            :ratio="1"
                            width="15px"
                            spinner-color="primary"
                            spinner-size="82px"
                          />
                        </div>
                        <div>{{ opc.text }}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
            </q-expansion-item>
          </template>
        </draggable>

          <div v-for="(item, i) in listaContatoSuporte" :key="i">
            <div>{{ item.title }}</div>
          </div>
      </q-list>
    </div>

    <div class="q-gutter-y-md q-mt-xl" style="max-width: 1000px; width: 90vw">
      <q-card class="q-pa-md">
        <div class="col-md-10 col-xs-10 q-gutter-md">
          <div class="row items-start q-gutter-md">
            <div class="col-md-10 q-gutter-md">
              <iframe :src="formInfo.data.map" class="iframe" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="col-md-10 q-gutter-md">
              <q-input outlined v-model="formInfo.data.map" type="text" label="Maps" />
            </div>
            <div class="col-md-10 q-gutter-md">
              <div>
                <q-input outlined v-model="formInfo.data.title" type="text" label="Título" />
              </div>
            </div>
          </div>
          <div>
            <q-editor
              v-model="form.data.msg"
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
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
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
                      <!-- <q-color v-model="foreColor" no-header no-footer default-view="palette" :palette="[
              '#ff0000', '#ff8000', '#ffff00', '##00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff'
            ]" class="my-picker" /> -->
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
            <div>
              <q-btn color="positive" icon="done" :disable="!validarDadosInfo" :label="formInfo.id ? 'Atualizar':'Salvar'" @click="onSubmit(formInfo)" />
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <div class="q-my-xl q-py-xl"></div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { useGlobalStore } from 'src/store/globalStore'
import { Loading, Dialog, Notify } from 'quasar'
import Draggable from "vue3-draggable";
import whatsapp from 'src/assets/whatsapppr.png'
import BtnAdmin from "src/components/btnAdmin.vue"

let photoInput = ref(null)
const global = useGlobalStore()
let currentUser = computed(() => global.currentUser)
let listaContatoSuporte = computed(() => global.listaContatoSuporte)
let infoContatoSuporte = computed(() => global.infoContatoSuporte)

let myList = computed({
  get() {
    return listaContatoSuporte.value.sort((a, b) => a.data.ordem - b.data.ordem)
  },
  set(value) {
    value.forEach((element, i) => {
      element.data.ordem = i
      onUpdate(element)
    });
  }
})

let optionsIcon = ref([
  {
    label: 'Telefone',
    value: 'phone'
  },
  {
    label: 'Whatsapp',
    value: 'whatsapp'
  },
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Data',
    value: 'event'
  }
])

let foreColor = ref('#000000')
let highlight = ref('#ffff00aa')
let editorRef = ref(null)
let token = ref(null)

let ordem = computed(() => listaContatoSuporte.value.length || 0)

let form = ref({
  id: null,
  collection: 'suporte',
  data: {
    title: '',
    contatos: [
      {
        icon: '',
        text: '',
      }
    ],
    ordem: ordem.value
  }
})


let formInfo = ref({
  id: 'k4VbOlSKhgprB885ejqy',
  collection: 'suporte-info',
  data: {
    title: 'Entre em contato',
    msg: `NOSSA ASSISTÊNCIA TÉCNICA ESTÁ PREPARADA PARA AUXILIAR OS CLIENTES SEMPRE QUE FOR PERTINENTE.
      FORMADA POR PROFISSIONAIS ESPECIALISTAS NO ASSUNTO PARA QUE VOCÊ RECEBA O MELHOR ATENDIMENTO.
      PARA SABER ONDE ENCONTRAR ASSISTÊNCIA TÉCNICA TRC EM SUA CIDADE ENTRE EM CONTATO ATRAVÉS DOS SEGUINTES CANAIS:`,
    map: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d432.94335859976877!2d-43.28177137294128!3d-22.64147712316234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1673576100912!5m2!1spt-BR!2sbr',
  }
})

let validarDados = computed(() => {
  let isForm = form.value.data
  if(isForm?.title && isForm?.contatos.length ) {
    return true
  } else {
    return false
  }
})

let validarDadosInfo = computed(() => {
  let isForm = formInfo.value.data
  if(isForm?.title && isForm?.msg && isForm?.map ) {
    return true
  } else {
    return false
  }
})

function onReset() {
  form.value = {
    id: null,
    collection: 'suporte',
    data: {
      title: '',
      contatos: [
        {
          icon: '',
          text: '',
        }
      ],
      ordem: 0
    }
  }

}

async function onSubmit(item) {

  if(item.id) {
    await onUpdate(item)
  } else {
    let val = {
      collection: item.collection,
      data: item.data
    }
    await global.saveDocs(val)
  }
}

async function onUpdate(item) {

  let value = {
    collection: item.collection,
    id: item.id,
    data: item.data
  }
  await global.updateDocs(value)
}

function setselectDuvida(item) {
  form.value = item
}


function addContato() {
  form.value.data.contatos.push({
    icon: '',
    text: ''
  })
}

function removeContato(i) {
  form.value.data.contatos.splice(i, 1)
}

function color (cmd, name) {
  const edit = editorRef.value
  token.value.hide()
  edit.caret.restore()
  edit.runCmd(cmd, name)
  edit.focus()
}

onMounted(() => {
  formInfo.value = infoContatoSuporte.value[0]
  console.log(formInfo.value)
})

</script>

<style>
.iframe {
  width: 80vw;
  max-width: 500px;
  height: 90vh;
  max-height: 500px;
}

.my-picker {
  max-width: 250px
}
</style>
