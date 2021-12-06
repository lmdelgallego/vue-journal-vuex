<template>

  <h1 v-if="autStatus === 'authenticating'">{{authStatus}}</h1>
  <router-view v-else/>
</template>

<script>
import useAuth from './modules/auth/composables/useAuth'
export default {
  setup() {
    const {authStatus, checkUser} = useAuth();
    checkUser();
    return {
      authStatus
    }
  }
}
</script>