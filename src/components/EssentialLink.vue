<template>
  <div>
    <q-item
      v-if="link"
      clickable
      tag="a"
      target="_blank"
      @click="onRouter(link)"
      :class="route.name == link ? 'bg-primary text-white':'bg-white'"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-uppercase">{{ title }}</q-item-label>
      </q-item-section>
    </q-item>

    <div v-else>
      <q-expansion-item
        expand-separator
        :label="title"
      >
        <q-card v-for="(opc, i) in lista" :key="i" @click="onRouter(link, opc)">
            <q-item>
              <q-item-section v-if="icon" avatar>
                <q-icon :name="icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">{{opc.data.title}}</q-item-label>
              </q-item-section>
            </q-item>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGlobalStore } from '../store/globalStore'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    lista: {
      type: Array,
      default: []
    },

    link: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const global = useGlobalStore()

    return {
      router: router,
      route: route,
      global: global,
    }
  },
  methods: {

    async onRouter(item, data=null) {
      console.log(item, data)
      if(data) {
        this.router.push({name: item, params: {id: data.link }})
      } else if(item == 'logout') {
        this.global.signOut()
      } else {
        this.router.push({name: item})
      }
    }
  }
})
</script>
