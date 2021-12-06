import { useStore } from "vuex";
import { computed } from "vue";

const useAuth = () => {

  const store = useStore();

  const createUser = async (user) => {
    const resp = await store.dispatch("auth/createUser", user);
    return resp;
  }

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/loginUser", user);
    return resp;
  }

  const checkUser = async () => {
    const resp = await store.dispatch("auth/checkUser");
    return resp;
  }

  return {
    createUser,
    loginUser,
    checkUser,

    authStatus: computed(() => store.getters["auth/getCurrentState"]),
  }
}

export default useAuth;