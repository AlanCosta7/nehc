<template>
  <div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md form"
    >
      <div class="text-h6" :class="dark?'text-black':'text-white'">{{ text }}</div>
      <div class="row justify-between items-center">
        <div class="col-5">
          <q-input bg-color="white" color="secondary" outlined v-model="form.name" type="text" label="Nome completo:" />
        </div>
        <div class="col-5">
          <q-input bg-color="white" color="secondary" outlined v-model="form.tel" type="text" mask="(##)#####-####" label="Telefone:" />
        </div>
      </div>
      <div>
          <q-input bg-color="white" color="secondary" outlined v-model="form.email" type="email" label="Email:" />
      </div>
      <div>
          <q-input bg-color="white" color="secondary" outlined v-model="form.msg" type="textarea" label="Tem alguma dúvida? Pergunte aqui:" />
      </div>
      <div>
        <q-btn label="Enviar" :disable="validarDados" type="submit" color="primary"/>
        <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useGlobalStore } from 'src/store/globalStore'
import { ref, computed } from "vue";
import { Notify } from "quasar";
const global = useGlobalStore()
const props = defineProps(['dark', 'text'])
let dark = computed(() => props.dark)
let text = computed(() => props.text)

let form = ref({
  name: null,
  tel: null,
  email: null,
  msg: null,
})

let validarDados = computed(() => {
  if(!form.value.name || !form.value.tel || !form.value.email || !form.value.msg) {
    return true
  } else {
    return false
  }

})

function onSubmit() {
  console.log(form.value)
  let val = {
    functions: 'sendContato',
    data: form.value
  }
  global.sendHttpCall(val)
  Notify.create({
    type: 'positive',
    message: 'Mensagem enviada com sucesso',
    timeout: 2000,
  })
  onReset()
}

function onReset() {
  form.value = {
    name: '',
    tel: '',
    email: '',
    msg: '',
  }
}

</script>

<style>
.form {
  opacity: 1;
}
</style>
