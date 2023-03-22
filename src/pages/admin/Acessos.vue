<template>
  <div class="fit row flex flex-center">
    <q-card style="width: 80%; max-width: 800px">
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title>
          Administradores
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <div class="text-h6 text-bold">Lista de Administradores</div>
        <q-list bordered v-for="(item, i) in listaAdmin" :key="i">
          <q-item>
            <q-item-section v-if="item.data.displayName">{{item.data.displayName}}</q-item-section>
            <q-item-section v-else>{{item.data.email}}</q-item-section>
            <q-item-section class="col-auto">
              <div class="q-gutter-md">
                <q-btn color="blue" icon="edit" round @click="editar(item)" />
                <q-btn color="negative" icon="close" round @click="excluirAdmin(item)" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="">
        <div class="text-h6 text-bold">Novo Administrador</div>
        <div class="row items-center full-width q-gutter-md">
          <q-input v-model="form.email" debounce="3000" outlined @update:model-value="emailValida" class="full-width" type="text" label="Email" />
          <q-input v-model="form.displayName" outlined class="full-width" type="text" label="Nome" />
          <q-select v-model="form.permission" :options="listaSettings" multiple class="full-width" label="Permissão" outlined />
        </div>
      </q-card-section>
      <q-card-actions align="center" class="q-gutter-md">
        <q-btn color="positive" class="q-px-xl" dense label="Salvar" @click="onAddAdmin" />
        <!-- <q-btn color="positive" dense :disabled="!emailVal || !emailAdmin" icon="add" label="Cadastrar usuário" @click="createUsuario" /> -->
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { Dialog, Notify } from 'quasar'
import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()

let form = ref({
  uid: null,
  displayName: null,
  email: null,
  permission: []
})

let listaSettings = ref(['Site', 'Paginas', 'Faixa paralax', 'Banner', 'Banner Home', 'Banner Institucional', 'Produtos', 'Suporte', 'Permissão de Acessos', 'Redes sociais'])
let currentUser = computed(() => global.currentUser)
let listaAdmin = computed(() => global.listaAdmin)

async function emailValida(item) {
  var email = item

  let value = {
    collection: 'users',
    param: 'email',
    doc: email
  }

  let result = await global.getDocs(value)
  console.log('emailValida', result)
  if(result.length) {
    form.value = {
      displayName: result[0].data.displayName,
      uid: result[0].id
    }
  }
}

async function onAddAdmin() {
  let uid = form.value.uid
  console.log('uid', uid)
  if(!uid) {
    createUsuario()
  }
  clearDados()
}

async function createUsuario() {

  let val = {
    functions: 'createUsuario',
    data: form.value
  }

  let result = await global.sendHttpCall(val)
  console.log('createUsuario', result)
  if(!result.error) {
    Notify.create({
      message: "Usuário criado com sucesso",
      type: 'positive',
    })
  } else {
    Notify.create({
      message: "Erro ao criar usuário",
      type: 'negative',
    })
  }
  return result
}

async function excluirAdmin(item) {

    Dialog.create({
      position: 'top',
      title: 'Atenção!!!',
      message: 'Tem certeza que deseja excluir esse usuário como administrador?',
      cancel: true,
      persistent: true
    }).onOk(() => {

      let val = {
        collection: 'admin',
        id: item.id,
      }

      global.deleteDocs(val)
      clearDados()
    }).onCancel(() => {
    }).onDismiss(() => {
    })

}

function editar(item) {
  form.value = item.data
}

function clearDados() {
  form.value = {
    uid: null,
    displayName: null,
    email: null,
    permission: []
  }
}
</script>

