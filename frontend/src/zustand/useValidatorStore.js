import { create } from 'zustand';

const useValidatorStore = create((set, get) => ({
  validatorData: [],

  // Action to add new validator data
  // addValidatorData: (newData) =>
  //   set((state) => ({
  //     validatorData: [...state.validatorData, newData],
  //   })),
  setLatestData: (newData) => {
    const newDataArray = Array.isArray(newData) ? newData : [newData];
    set({ validatorData: newDataArray });
  },
  addValidatorData: (newData) => {
    const currentData = get().validatorData;
    console.log(
      'New data to be added:',
      newData,
      'Current validator data:',
      currentData
    );
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
// // import { create } from 'zustand';
// // import { getAllValidationUblInfo } from '../services/api';

// // const useValidatorStore = create((set, get) => ({
// //   validatorData: [],
// //   isDataFetched: false, // New flag to check if data is already fetched

// //   addValidatorData: (newData) => {
// //     console.log('New data to be added:', newData);
// //     set((state) => ({
// //       validatorData: [...state.validatorData, ...newData],
// //     }));
// //   },

// //   getValidatorData: () => {
// //     const state = get();
// //     return state.validatorData;
// //   },

// //   getValidatorDataById: (id) => {
// //     const state = get();
// //     return state.validatorData.find((data) => data._id === id);
// //   },

// //   clearValidatorData: () => set({ validatorData: [] }),

// //   fetchInitialData: async (userId, showAlert) => {
// //     if (get().isDataFetched) {
// //       return; // If data is already fetched, do nothing
// //     }
// //     try {
// //       const result = await getAllValidationUblInfo({ userId });
// //       if (result.error) {
// //         console.error('Error fetching initial XML files:', result);
// //         showAlert('Error fetching initial XML files', 'tomato');
// //       } else {
// //         set((state) => ({
// //           validatorData: [...state.validatorData, ...result],
// //           isDataFetched: true,
// //         }));
// //       }
// //     } catch (error) {
// //       console.error('An unexpected error occurred:', error);
// //       showAlert(
// //         'An unexpected error occurred while fetching initial XML files. Please try again later.',
// //         'tomato'
// //       );
// //     }
// //   },
// // }));

// // export default useValidatorStore;
// import { create } from 'zustand';
// import { getAllValidationUblInfo } from '../services/api';

// const useValidatorStore = create((set, get) => ({
//   validatorData: [],
//   isDataFetched: false, // New flag to check if data is already fetched

//   setLatestData: (newData) => {
//     const newDataArray = Array.isArray(newData) ? newData : [newData];
//     set({ validatorData: newDataArray });
//   },

//   addValidatorData: (newData) => {
//     const currentData = get().validatorData;
//     const newDataArray = Array.isArray(newData) ? newData : [newData];

//     // Check for duplicates before adding new data
//     const uniqueData = newDataArray.filter(
//       (newItem) => !currentData.some((item) => item._id === newItem._id)
//     );

//     console.log('New data to be added:', uniqueData);
//     set((state) => ({
//       validatorData: [...state.validatorData, ...uniqueData],
//     }));
//   },

//   getValidatorData: () => {
//     return get().validatorData;
//   },

//   getValidatorDataById: (id) => {
//     return get().validatorData.find((data) => data._id === id);
//   },

//   clearValidatorData: () => set({ validatorData: [] }),

//   fetchInitialData: async (userId, showAlert) => {
//     if (get().isDataFetched) {
//       return; // If data is already fetched, do nothing
//     }
//     try {
//       const result = await getAllValidationUblInfo({ userId });
//       if (result.error) {
//         console.error('Error fetching initial XML files:', result);
//         showAlert('Error fetching initial XML files', 'tomato');
//       } else {
//         const currentData = get().validatorData;

//         // Check for duplicates before adding new data
//         const uniqueData = result.filter(
//           (newItem) => !currentData.some((item) => item._id === newItem._id)
//         );

//         set((state) => ({
//           validatorData: [...state.validatorData, ...uniqueData],
//           isDataFetched: true,
//         }));
//       }
//     } catch (error) {
//       console.error('An unexpected error occurred:', error);
//       showAlert(
//         'An unexpected error occurred while fetching initial XML files. Please try again later.',
//         'tomato'
//       );
//     }
//   },
// }));

// export default useValidatorStore;
