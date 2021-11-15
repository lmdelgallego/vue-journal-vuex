import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";

import EntryList from '@/modules/daybook/components/Entrylist.vue';
import journal from '@/modules/daybook/store/journal';
import {testJournalState} from '../../../mocks/test-journal-state';



const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initialState}
    },
  }
});

const mockRoute = {
  push: jest.fn(),
};

/*
const journalMockModule = {
    namespaced: true,
    getters: {
      // getEntriesByTerm: jest.fn()
      getEntryByTerm,
      getEntryById
    },
    state: () =>({
      isLoading: false,
      entries: testJournalState.entries
    })
  };

  const store = createStore({
    modules: {
      journal: {...journalMockModule}
    }
  }); */

describe('EntryList.vue', () => {

  const store = createVuexStore(testJournalState);

  let wrapper ;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRoute
        },
        plugins: [store],
      }
    });
  });

  test('should be call getEntriesByTerm without terms and show two entries', () => {
    expect(wrapper.findAll('entry-stub').length).toBe(2);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should be call getEntryByTerm and filter entries', async () => {
    const input = wrapper.find('input');
    await input.setValue('primer');
    expect(wrapper.findAll('entry-stub').length).toBe(1);
  });

  test('should be redirect to /new when the button is clicked ', () => {
     wrapper.find('button').trigger('click');
     expect(mockRoute.push).toHaveBeenCalled();
     expect(mockRoute.push).toHaveBeenCalledWith({"name": "daybook-entry", "params": {"id": "new"}});
  })

});