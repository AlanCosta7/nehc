<template>
  <div v-if="currentUser" class="row justify-center relative-position">
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
</template>

<script setup>
import { computed } from 'vue'
import { useGlobalStore } from 'src/store/globalStore'
import { Dialog } from 'quasar'

const props = defineProps(['form', 'collection', 'validarDados' ])
const emit = defineEmits(['onReset'])
const global = useGlobalStore()

let form = computed(() => props.form)
let currentUser = computed(() => global.currentUser)
let validarDados = computed(() => props.validarDados)

function onReset() {
  emit('onReset')
}

async function onSubmit() {
  console.log('onSubmit', form.value)
  if(form.value.id) {
    let val = {
      collection: props.collection,
      data: form.value.data,
      id: form.value.id
    }
    await global.updateDocs(val)
    onReset()
  } else {
    let val = {
      collection: props.collection,
      data: form.value.data
    }
    console.log('saveDocs:', val)
    await global.saveDocs(val)
    onReset()
  }
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
      collection: props.collection,
      id: form.value.id
    }
    await global.deleteDocs(val)
    onReset()
  })

}



</script>
