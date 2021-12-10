import { createStore } from 'vuex';

import auth from '@/modules/auth/store';
import journal from '@/modules/daybook/store/journal';
import { testJournalState } from './test-journal-state';

const createVuexStore = (authInitStat, journalInitState = testJournalState) =>
  createStore({
    modules: {
      auth: {
        ...auth,
        state: {
          ...authInitStat,
        },
      },
      journal: {
        ...journal,
        state: {
          ...journalInitState,
        },
      },
    },
  });

export default createVuexStore;
