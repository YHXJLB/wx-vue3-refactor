// src/stores/app.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  // State
  const role = ref('user'); // Default role

  // Actions
  const setRole = (newRole) => {
    role.value = newRole;
    // Persist role to localStorage
    localStorage.setItem('app_role', newRole);
  };

  const restoreRole = () => {
    // Restore role from localStorage
    const savedRole = localStorage.getItem('app_role');
    if (savedRole) {
      role.value = savedRole;
    }
  };

  const clearRole = () => {
    role.value = 'user';
    localStorage.removeItem('app_role');
  };

  return {
    // State
    role,
    // Actions
    setRole,
    restoreRole,
    clearRole
  };
});
