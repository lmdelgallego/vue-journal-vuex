/*
export const myAction = async ({commit}) => {

}
*/

import journalApi from '@/api/journalApi';

export const loadEntries = async ({commit}) => {
  const {data} = await journalApi.get('/entries.json');
  const entries = [];
  for (let id of Object.keys(data))  {
      entries.push({id, ...data[id]})
  }
  commit('setEntries', entries);
}

export const createEntry = async ({commit},entry) => {
  console.log(entry);
  console.log(commit)
  // await journalApi.put(`/${entry.id}.json`, entry );

}

export const updateEntry = async ({commit}, entry) => {
  const {date, picture, text} = entry;
  const dataToSave = {date,picture,text};
  await journalApi.put(`/entries/${entry.id}.json`, dataToSave );
  commit('updateEntries', {...entry});
}
