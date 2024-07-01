import { create } from 'zustand';

const useValidatorStore = create((set, get) => ({
  validatorData: [],

  // Action to add new validator data
  // addValidatorData: (newData) =>
  //   set((state) => ({
  //     validatorData: [...state.validatorData, newData],
  //   })),
  addValidatorData: (newData) => {
    console.log('New data to be added:', newData);
    set((state) => ({
      validatorData: [...state.validatorData, newData],
    }));
  },

  getValidatorDataById: (id) => {
    const state = get();
    return state.validatorData.find((data) => data._id === id);
  },

  getValidatorData: () => {
    const state = get();
    return state.validatorData;
  },

  // Action to clear all validator data
  clearValidatorData: () => set({ validatorData: [] }),
}));

export default useValidatorStore;
