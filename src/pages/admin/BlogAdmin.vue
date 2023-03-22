<template>
  <div v-if="currentUser" class="row justify-center relative-position">
    <div style="width:80vw; max-width: 1200px">
      <div>
        <h1 class="primaryGradiente text-center text-uppercase text-weight-bolder" style="width:80vw; max-width: 400px">Blog</h1>
      </div>
      <div class="row items-start justify-around">
        <q-list class="col-md-2 col-xs-10 q-pa-md">
          <div class="text-bold q-mb-md">Lista de artigos:</div>
          <q-item class="borda" clickable v-ripple v-for="(item, i) in listaBlog" :key="i" @click="setForm(item)">
            <q-item-section v-if="item && item.data && item.data.title">{{ item.data.title }}</q-item-section>
          </q-item>
        </q-list>
        <div class="col-md-10 col-xs-10 q-gutter-md">
          <div class="row items-start q-gutter-md">
            <div>
              <div>
                <q-img width="300px" height="300px" :src="form.data.img" @click="onPickPhoto" class="cursor-pointer">
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-negative text-white">
                      Clique aqui para add a imagem do Post
                    </div>
                  </template>
                </q-img>
                <input
                  ref="photoInput"
                  debounce="500"
                  type="file"
                  @change="onPhotoURLPicked"
                  name="photo"
                  style="display: none;"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="col-md-6 q-gutter-md">
              <div>
                <q-input outlined v-model="form.data.title" type="text" label="Título" />
              </div>
              <div>
                <q-input filled v-model="form.data.date" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.data.date" mask='DD [de] MMMM [de] YYYY'>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div>
            <q-editor
              v-model="form.data.text"
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
            <BtnAdmin :form="form" collection="blog" @onReset="onReset" :validarDados="validarDados" />
          </div>
        </div>
      </div>
    </div>
    <div class="q-py-xl"></div>
  </div>
</template>

<script setup>

import { ref, computed } from "vue"
import { useGlobalStore } from 'src/store/globalStore'
import { Dialog } from "quasar";
import BtnAdmin from "src/components/btnAdmin.vue"

const global = useGlobalStore()

let currentUser = computed(() => global.currentUser)
let foreColor = ref('#000000')
let highlight = ref('#ffff00aa')
let editorRef = ref(null)
let token = ref(null)

let listaBlog = computed(() => global.listaBlog)
console.log('listaBlog', listaBlog.value)
let form = ref({
  id: null,
  data: {
    title: null,
    date: null,
    text: null,
    img: './'
  }
})

let validarDados = computed(() => {
  let isForm = form.value.data
  if(isForm?.title && isForm?.date && isForm?.text ) {
    return true
  } else {
    return false
  }
})

function setForm(item) {
  form.value = item
}

function onReset() {

  form.value = {
    id: null,
    data: {
      title: '',
      date: '',
      text: '',
      img: './'
    }
  }
}

async function onSubmit() {

  if(form.value.id) {
    let val = {
      collection: 'blog',
      data: form.value.data,
      id: form.value.id
    }
    await global.updateDocs(val)
    onReset()
  } else {
    let val = {
      collection: 'blog',
      data: form.value.data
    }
    await global.saveDoc(val)
    onReset()
  }
}

function onPickPhoto() {
  if(form.value.id) {
    photoInput.value.click();
  } else {
    Dialog.create({
      title: "Crie primeiro um Post e adicione em seguida a imagem"
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
    collection: 'blog',
    files: file,
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    form.value.data.img = base64
  })
  fileReader.readAsDataURL(file)

  global.uploadPhotoURL(value)

}

function color (cmd, name) {
  const edit = editorRef.value
  token.value.hide()
  edit.caret.restore()
  edit.runCmd(cmd, name)
  edit.focus()
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
      collection: 'blog',
      id: form.value.id
    }
    await global.deleteDocs(val)
    onReset()
  })

}

</script>

<style>
.my-picker {
  max-width: 250px
}
</style>
