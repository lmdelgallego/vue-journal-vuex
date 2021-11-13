import {createStore} from 'vuex';
import journal from '@/modules/daybook/store/journal';
import {testJournalState, testJournalEntry} from 'tests/unit/mocks/test-journal-state';


const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initialState}
    },
  }
});

describe('Vuex - Test of journal store', () => {
  describe('#Store', () => {

    test('should be create store', () => {
      const store = createVuexStore(testJournalState);
      const {isLoading, entries } = store.state.journal;
      expect(isLoading).toBeFalsy();
      expect(entries).toEqual(testJournalState.entries);
    });

  })

  // Mutations
  describe('#Mutations', () => {
    test('setEntries', () => {
      const store = createVuexStore({isLoading: true, entries: []});
      store.commit('journal/setEntries', testJournalState.entries);
      expect(store.state.journal.entries.length).toBe(2);
      expect(store.state.journal.isLoading).toBeFalsy();
    });

    test('updateEntries', () => {
      const store = createVuexStore(testJournalState);
      const {isLoading, entries} = store.state.journal;
      const newEntry = {
        ...testJournalEntry,
        text: 'Hola Mundo desde prueba'
      }
      store.commit('journal/updateEntries', newEntry);
      expect(entries.length).toBe(2);
      expect(isLoading).toBeFalsy();
      expect(entries.find( e => e.id === newEntry.id).text)
        .toEqual('Hola Mundo desde prueba');
    });

    test('addEntry', () => {
      const store = createVuexStore(testJournalState);
      const newEntry = {
        id: 't1',
        date: new Date().getTime(),
        text: 'Hola Mundo desde prueba'
      }
      store.commit('journal/addEntries', newEntry);
      const {isLoading, entries} = store.state.journal;
      expect(entries.length).toBe(3);
      expect(isLoading).toBeFalsy();
      expect(entries.findIndex( e => e.id === newEntry.id)).not.toBe(-1);

      store.commit('journal/removeEntry', 't1');
      expect(store.state.journal.entries.length).toBe(2);
      expect(store.state.journal.entries.findIndex( e => e.id === newEntry.id)).toBe(-1);
    });

  })


})
