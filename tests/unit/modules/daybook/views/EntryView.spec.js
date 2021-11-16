import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import journal from '@/modules/daybook/store/journal';
import EntryView from '@/modules/daybook/views/EntryView.vue';
import { testJournalEntry, testJournalState } from "../../../mocks/test-journal-state";
import Swal from "sweetalert2";


const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initialState}
    },
  }
});

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));


const mockRoute = {
  push: jest.fn(),
};


describe('EntryView', () => {

  const store = createVuexStore(testJournalState);
  let wrapper ;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: testJournalEntry.id,
      },
      global: {
        mocks: {
          $router: mockRoute
        },
        plugins: [store],
      }
    });
  });
  test("should be out user if id don't exist", () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: 'does not exist'
      },
      global: {
        mocks: {
          $router: mockRoute
        },
        plugins: [store],
      }
    });

    expect(mockRoute.push).toBeCalled();
    expect(mockRoute.push).toBeCalledWith({name: 'daybook-no-entry'});

  });

  test("should be show entry correctly", ()=> {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRoute.push).not.toBeCalled();
  });

  test("should be delete entry and out", (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}));
    wrapper.find('#delete-entry').trigger('click');
    expect(Swal.fire).toBeCalled();
    expect(Swal.fire).toBeCalledWith({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    });
    setTimeout(() => {
      expect(mockRoute.push).toBeCalled();
      done();
    }, 1);

  })
});