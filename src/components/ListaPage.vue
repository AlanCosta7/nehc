<template>
  <div class="column q-my-md">
    <div class="text-bold q-mb-md">{{ title }}</div>
    <q-select :disable="!siteSelect" v-model="page" :options="listaPages" label="Páginas" outlined />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()
const props = defineProps(["title"]);

let siteSelect = computed(() => global.siteSelect)
let title = computed(() => props.title)
let listaPages = computed(() => {
  let lista = global.listaPages?.filter(v => v.data.site == siteSelect.value?.data?.name)
  return lista.map((v)=> {
    return {
      label: v.data.page,
      value: v.data.link
    }
  })
})

let pageSelect = computed(() => global.pageSelect)

let page = computed({
  get() {
    return pageSelect.value
  },
  set(val) {
    global.setPages(val)
  }
})

</script>
