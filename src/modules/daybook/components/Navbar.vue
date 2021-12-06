<template>
  <nav class="navbar bg-primary">
    <a href="" class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        alt="Vue Logo"
        height="24"
        class="d-inline-block aling-text-top mx-2"
      />
      Daybook - {{userName}}
    </a>
    <div class="d-flex">
      <button @click="onLogout" class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import useAuth from '@/modules/auth/composables/useAuth';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const {userName, logout} = useAuth();
    const router = useRouter();
    return {
      userName,
      onLogout: () => {
        logout();
        router.push({name: 'login'});
      },
    };
  }
}
</script>