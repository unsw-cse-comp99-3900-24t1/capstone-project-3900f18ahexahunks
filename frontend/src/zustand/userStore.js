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
  user: null,
  token: null,
  error: null,
  setUser: (user, token) => set({ user, token, error: null }),
  clearUser: () => set({ user: null, token: null }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default userStore;
