import authApi from "../../../api/authApi";

export const createUser = async ({commit}, user) => {
  try {
    const { name, email, password } = user;
    const {data} = await authApi.post(":signUp", { email, password, returnSecureToken: true });
    const { idToken, refreshToken } = data;

    const respUpdateName = await authApi.post(":update", { displayName: name, idToken });
    console.log(commit, respUpdateName);
    delete user.password;
    commit('loginUser', {user, idToken, refreshToken});

    return {ok: true, message: "User created", token: data.idToken};
  } catch ({response}) {
    return {ok: false, message: response.data.error.message};
  }
}

export const loginUser = async ({commit}, user) => {
  try {
    const { email, password } = user;
    const {data} = await authApi.post(":signInWithPassword", { email, password, returnSecureToken: true });
    const { idToken, refreshToken, displayName } = data;
    delete user.password;
    user.name = displayName;
    commit('loginUser', {user, idToken, refreshToken});

    return {ok: true, message: "User logged in", token: data.idToken};
  } catch ({response}) {
    return {ok: false, message: response.data.error.message};
  }
}

export const checkUser = async ({commit}) => {
  const localIdToken = localStorage.getItem("idToken");
  // const refreshToken = localStorage.getItem("refreshToken");

  if(!localIdToken) {
    commit('logoutUser');
    return { ok: false, message: "No hay token" };
  }

  try {

    const { data } = await authApi.post(":lookup", { idToken: localIdToken });
    console.log(data);
    const { refreshToken, displayName, email, idToken } = data.users[0];
    const user = { name: displayName, email,  };
    commit('loginUser', {user, idToken, refreshToken});
    return { ok: true, message: "User logged in", token: idToken };

  } catch (error) {
    commit('logoutUser');
    return { ok: false, message: "Token invalido" };
  }
}