// src/stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTokenByRole } from '@/utils/auth'; // Assuming this utility is migrated

export const useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref({}); // User profile data
  const token = ref(''); // User token

  // Getters (optional, but useful for computed state)
  const isLoggedIn = computed(() => !!token.value);

  // Actions
  const setUserInfo = (info) => {
    userInfo.value = info;
  };

  const setUserToken = (newToken) => {
    token.value = newToken;
    // Persist token based on role (assuming role is known)
    const currentRole = localStorage.getItem('app_role') || 'user';
    localStorage.setItem(`token_${currentRole}`, newToken);
  };

  const fetchProfile = async () => {
    // Example API call - replace with actual endpoint
    try {
      // const response = await axios.get('/api/user/profile', {
      //   headers: { Authorization: `Bearer ${token.value}` }
      // });
      // setUserInfo(response.data);
      console.log('Fetching user profile... (stub)');
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Handle error (e.g., logout user)
    }
  };

  const login = async (credentials) => { // Example login action
    // Example API call - replace with actual endpoint
    try {
      // const response = await axios.post('/api/auth/login', credentials);
      // const { user, access_token } = response.data;
      // setUserInfo(user);
      // setUserToken(access_token);
      // localStorage.setItem('app_role', 'user'); // Set role after login
      console.log('Logging in user... (stub)', credentials);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to handle in component
    }
  };

  const logout = () => {
    userInfo.value = {};
    token.value = '';
    // Clear token based on role
    const currentRole = localStorage.getItem('app_role');
    if (currentRole) {
      localStorage.removeItem(`token_${currentRole}`);
    }
    localStorage.removeItem('app_role');
  };

  return {
    // State
    userInfo,
    token,
    // Getters
    isLoggedIn,
    // Actions
    setUserInfo,
    setUserToken,
    fetchProfile,
    login,
    logout
  };
});
