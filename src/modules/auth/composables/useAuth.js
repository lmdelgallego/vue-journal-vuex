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

  const logout = () => {
    store.commit("auth/logoutUser");
    store.commit("journal/clearEntries");
  }

  return {
    createUser,
    loginUser,
    checkUser,
    logout,

    authStatus: computed(() => store.getters["auth/getCurrentState"]),
    userName: computed(() => store.getters["auth/getUserName"]),
  }
}

export default useAuth;