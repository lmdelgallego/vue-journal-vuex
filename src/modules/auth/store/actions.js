/*
export const myAction = async ({commit}) => {

}
*/

import authApi from "../../../api/authApi";

export const createUser = async ({commit}, user) => {
  try {
    const { name, email, password } = user;
    const {data} = await authApi.post(":signUp", { email, password, returnSecureToken: true });
    //TODO: mutation loginUser
    //commit('setUser', response.data, name);
    console.log(commit, name, data);

    return {ok: true, message: "User created", token: data.idToken};
  } catch ({response}) {
    return {ok: false, message: response.data.error.message};
  }
}