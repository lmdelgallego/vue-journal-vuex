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