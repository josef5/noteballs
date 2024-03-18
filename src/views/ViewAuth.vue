<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }"><a @click.prevent="register = false">Login</a></li>
        <li :class="{ 'is-active': register }"><a @click.prevent="register = true">Register</a></li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                v-model="credentials.email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="credentials.password"
                placeholder="Enter a password"
              />
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

const register = ref(false)

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login'
})

const credentials = reactive({
  email: 'test@test.com',
  password: 'aaaaaa'
})

const onSubmit = () => {
  console.log('Form submitted')
  if (!credentials.email || !credentials.password) {
    alert('Please enter both email and password')
    return
  } else {
    if (register.value) {
      // console.log('Register', credentials)
      storeAuth.register(credentials)
    } else {
      console.log('Login', credentials)
      storeAuth.login(credentials)
    }
  }
}
</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
