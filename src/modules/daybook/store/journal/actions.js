/*
export const myAction = async ({commit}) => {

}
*/

import journalApi from '@/api/journalApi';

export const loadEntries = async ({commit}) => {
    const {data} = await journalApi.get('/entries.json');
    console.log(commit, data);
}

export const createEntry = async ({commit}) => {
    console.log(commit);
}

export const updateEntry = async ({commit}) => {
    console.log(commit);
}
