<template>
  <div class="row justify-center fit">
    <div class="q-gutter-y-md q-mt-xl" style="max-width: 1000px; width: 90vw">
      <q-card>
        <q-card-section class="q-gutter-sm">
          <div class="text-subtitle1 text-bold line-height"> <q-input outlined v-model="pergunta" type="text" label="Pergunta" /> </div>
          <div class="text-subtitle1 text-bold line-height"> <q-input outlined v-model="resposta" type="text" label="Resposta" />
          </div>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn color="secondary" class="full-width text-black" @click="onSalvar()" label="Salvar" />
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-my-xl" style="max-width: 1000px; width: 90vw">
      <div>Lista de <b>Perguntas frequentes:</b></div>
      <q-list bordered class="rounded-borders" >
        <draggable v-model="myList" item-key="data.ordem" class="row full-width items-start justify-center">
            <template #item="{ element }" class="full-width">

              <q-expansion-item
                expand-separator
                class="full-width"
                icon="drag_indicator"
                :label="element.data.pergunta"
              >
                <q-card>
                  <q-card-section class="cursor-pointer" @click="setselectDuvida(element)">
                    {{element.data.resposta}}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </template>

        </draggable>

      </q-list>
    </div>

    <q-dialog v-model="dialogUpdateDuvida" v-if="selectDuvida" maximized class="bg-white">

        <q-card style="max-width: 1000px; width: 100vw">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
            </q-toolbar-title>
            <q-btn flat dense icon="clase" label="Fechar" @click="dialogUpdateDuvida = false" />
          </q-toolbar>
          <q-card-section class="q-gutter-sm">
            <div class="text-subtitle1 text-bold line-height"> <q-input outlined v-model="selectDuvida.data.pergunta" type="text" label="Título da notícia" /> </div>
            <div class="text-subtitle1 text-bold line-height"> <q-input outlined v-model="selectDuvida.data.resposta" type="text" label="Resposta" /> </div>
          </q-card-section>
          <q-card-actions class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-gutter-md" align="center">
            <q-btn color="secondary" style="width: 300px" outline class="text-black" label="Excluir" @click="onDelete" />
            <q-btn color="secondary" style="width: 300px" class="text-black" label="Atualizar" @click="onUpdate" />
          </q-card-actions>
        </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import {ref, computed, onMounted} from 'vue'
import { useGlobalStore } from 'src/store/globalStore'
import { Loading, Dialog, Notify } from 'quasar'
import draggable from "vuedraggable";

const global = useGlobalStore()
let currentUser = computed(() => global.currentUser)
let duvidas = computed(() => global.duvidas)

let pergunta = ref('')
let resposta = ref('')
let selectDuvida = ref(null)
let dialogUpdateDuvida = ref(false)

let myList = computed({
  get() {
    let lista = this.duvidas.sort(function (a, b) {
      if (a.data.ordem > b.data.ordem) {
        return 1;
      }
      if (a.data.ordem < b.data.ordem) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return lista
  },
  set(value) {
    let lista = value.map(function(currentelement, index) {

      let data = {
        ordem: index,
        pergunta: currentelement.data.pergunta,
        resposta: currentelement.data.resposta
      }
      let id = currentelement.id

      return {
        data: data,
        id: id
      }
    })

    lista.forEach(element => {
      let value = {
        id: element.id,
        collection: 'duvidas',
        value: {
          ordem: element.data.ordem
        }
      }
      this.$store.dispatch('updateDuvidas', value)
    });

    this.$store.commit('ordenarduvidas', lista)

  }
})

let ordem = computed(() => this.duvidas.length || 0)

function clear() {
  pergunta.value = ''
  resposta.value = ''
}

async function onSalvar() {
  let value = {
    collection: 'duvidas',
    value: {
      pergunta: pergunta.value,
      resposta: resposta.value,
      ordem: ordem.value
    }
  }
  await global.saveDoc(value)
  clear()
}

async function onUpdate(item) {
  let selectDuvida = item || selectDuvida.value
  let value = {
    id: selectDuvida.id,
    collection: 'duvidas',
    data: {
      pergunta: selectDuvida.data.pergunta,
      resposta: selectDuvida.data.resposta,
      ordem: selectDuvida.data.ordem
    }
  }
  dialogUpdateDuvida.value = false
  await global.updateDocs(value)
}

function redirectToApp(redirectDelay) {
  //var nickname = this.business.nickname
  Loading.show({
    html: true,
    message: '<h3>Carregando...</h3>'
  })
  setTimeout(() => {
    router.push({
      name: "index",
      //params: { nickname: nickname },
    });
    Loading.hide();
  }, redirectDelay);
}

function setselectDuvida(item) {
  selectDuvida.value = item
  dialogUpdateDuvida.value = true
}

function onDelete() {
  Dialog.create({
    title: "Atenção!!!",
    message: "Tem certeza que deseja excluir esse item? Essa ação é irreversível",
    cancel: true,
    persistent: true
  })
  .onOk(async () => {
    let value = {
      collection: 'duvidas',
      id: selectDuvida.value.id,
    }
    await global.deleteDocs(value)
    dialogUpdateDuvida.value = false
  })
}

</script>
