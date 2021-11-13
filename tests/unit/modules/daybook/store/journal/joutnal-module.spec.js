import {createStore} from 'vuex';
import journal from '@/modules/daybook/store/journal';
import {testJournalState} from '../../../../mocks/test-journal-state';
import journalModule from '@/modules/daybook/store/journal';


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
  })


})
