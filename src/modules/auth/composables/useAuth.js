// const { useStore } = require("vuex")

const useAuth = () => {

  // const store = useStore();

  const createUser = async (user) => {
    console.log("createUser", user);
    return 'Respuesta de la API createUser';
  }

  return {
    createUser
  }
}

export default useAuth;