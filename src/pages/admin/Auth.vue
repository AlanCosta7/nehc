<template>
  <div class="row justify-center" style="height: 100vh">
    <div class="col-lg-6 col-sm-6">
      <div class="row justify-center">
        <h5 class="text-uppercase text-center text-weight-bolder">Login</h5>
      </div>
      <div class="row justify-center">
        <div>
          <q-form
            @submit="onSubmit()"
            @reset="onReset"
          >
            <div class="row justify-center">
              <div class="col-12" >
                <q-input rounded outlined color="primary" bg-color="white" v-model="email" type="text" label="Email" />
              </div>
              <div class="col-12 q-my-lg" >
                <q-input rounded outlined color="primary" bg-color="white" v-model="password" type="password" label="Senha" />
              </div>
              <div class="col-12" >
                <q-btn class="text-white" rounded label="Entrar" type="submit" color="primary"/>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-sm-6">
      <q-img
        src="../../assets/login.webp"
        height="100vh"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from 'src/store/globalStore'
import { ref, computed } from 'vue'
import { Loading } from 'quasar'
import { useRouter } from 'vue-router'

  const global = useGlobalStore()
  const router = useRouter()

  let currentUser = computed(() => global.currentUser)
  console.log('currentUser', currentUser)
  let email = ref('')
  let password = ref('')

  function redirectToApp() {
    Loading.show({
      message: '<h3>Carregando...</h3>',
      html: true
    })

    setTimeout(() => {
      Loading.hide();
      router.push({name:'pages-admin'})
    }, 3000);

  }

  async function onSubmit() {

    Loading.show({
      message: '<h3>Carregando...</h3>',
      html: true
    })

    let result = await global.signIn({
      email: email.value.trim(),
      password: password.value,
      provider: 'email_password'
    })
    console.log('result', result)
    if(result) {
      redirectToApp()
    } else {
      Loading.hide();
    }
  }

</script>

<style>
.firebase-emulator-warning {
  display: none;
}
</style>
