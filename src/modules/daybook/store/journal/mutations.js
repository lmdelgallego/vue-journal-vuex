/*
export const myMutation = (state) => {

}
* */

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
}

export const updateEntries = (/*state*/) => {

}
export const addEntries = (/*state*/) => {

}
