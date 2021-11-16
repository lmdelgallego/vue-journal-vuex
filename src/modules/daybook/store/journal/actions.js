/*
export const myAction = async ({commit}) => {

}
*/

import journalApi from '@/api/journalApi';
// import { deleteImage } from '@/helpers/imageApi';

export const loadEntries = async ({commit}) => {
  const {data} = await journalApi.get('/entries.json');

  if(!data) {
    commit('setEntries', []);
    return;
  }

  const entries = [];
  for (let id of Object.keys(data))  {
      entries.push({id, ...data[id]})
  }
  commit('setEntries', entries);
}

export const createEntry = async ({commit}, entry) => {
  const {date, picture, text} = entry;
  const dataToSave = {date,picture,text};
  const {data} = await journalApi.post(`/entries.json`, dataToSave );
  commit('addEntries', {...entry, id: data.name });
  return data.name;
}

export const updateEntry = async ({commit}, entry) => {
  const {date, picture, text} = entry;
  const dataToSave = {date,picture,text};
  await journalApi.put(`/entries/${entry.id}.json`, dataToSave );
  dataToSave.id = entry.id;
  commit('updateEntries', {...dataToSave});
}

//delete entry
export const removeEntry = async ({commit}, entry) => {
  await journalApi.delete(`/entries/${entry.id}.json`);
  // await deleteImage(entry.picture_id);
  commit('removeEntry', entry.id);
}