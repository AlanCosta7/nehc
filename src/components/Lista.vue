<template>
  <div class="column q-my-md">
    <div class="text-bold q-mb-md">{{ title }}</div>
    <q-list bordered v-for="(item, i) in lista" :key="i" class="q-my-xs full-width">
      <q-item v-if="item" clickable :class="siteSelect == item.id ? 'bg-positive text-white':'bg-white' " class="column items-center" @click="selectItem(item)" >
        <q-item-section class="col-12">
          <div class="text-subtitle1 text-bold line-height">
            <slot :item="item"></slot>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGlobalStore } from 'src/store/globalStore'

const global = useGlobalStore()

const props = defineProps(["lista", "title"]);
const emit = defineEmits(['select'])
let siteSelect = computed(() => global.siteSelect?.id)

function selectItem(item) {
  emit('select', item)
}

</script>

<style>

</style>
