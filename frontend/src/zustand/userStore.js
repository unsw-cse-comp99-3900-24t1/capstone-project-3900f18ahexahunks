import { create } from 'zustand';

/**
 * @typedef {Object} CurrentUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * Provides a Zustand store for managing the current user's state.
 * Allows for setting, updating, and clearing the current user information.
 */
const userStore = create((set) => ({
  currentUser: { id: '', name: '', email: '' },
  // setCurrentUser: (userDetails) => set({ currentUser: userDetails }),
  // clearCurrentUser: () => set({ currentUser: { name: '', email: '' } }),
  // updateNameCurrentUser: (name) =>
  //   set((state) => ({
  //     currentUser: { ...state.currentUser, name },
  //   })),
}));

export default userStore;
