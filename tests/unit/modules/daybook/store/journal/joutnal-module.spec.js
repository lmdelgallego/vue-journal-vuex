import {createStore} from 'vuex';
import journal from '@/modules/daybook/store/journal';
import {testJournalState, testJournalEntry} from '../../../../mocks/test-journal-state';


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

  })


})
