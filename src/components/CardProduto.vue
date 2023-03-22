<template>
  <q-card v-if="produto" style="width: 100vw; max-width: 300px; min-height: 480px">
    <q-img style="width: 100vw; max-width: 300px" :ratio="1" :src="produto.data.midia[0]" />
    <q-card-section>
      <div class="text-h6 ellipsis-3-lines">{{produto.data.title}}</div>
      <div class="text-subtitle2">{{ produto.data.descricao }}</div>
    </q-card-section>
    <q-card-actions align="center" class="absolute-bottom q-py-lg">
      <q-btn style="width: 150px" rounded outline :color="color" :label="label" @click="onRouter"  />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed } from "vue"
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['produto', 'color', 'label'])
const router = useRouter()
const route = useRoute()

const produto = computed(() => props.produto)
const color = computed(() => props.color)
const label = computed(() => props.label)
let name = computed(() => route.name.split('-'))

function onRouter() {
  router.push({name: `${name.value[0]}-produto`, params:{id: produto.value.id }})
}

</script>

