/*
export const myMutation = (state) => {

}
*/

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
}

export const updateEntries = (state, entry) => {
  const idx = state.entries.map( e => e.id ).indexOf(entry.id);
  state.entries[idx] = entry;
}
export const addEntries = (state, entry) => {
  state.entries = [entry, ...state.entries];
}

// remove entry
export const removeEntry = (state, id) => {
  state.entries = state.entries.filter( e => e.id !== id );
}
