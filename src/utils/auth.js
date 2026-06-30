// src/utils/auth.js

// Example utility functions for authentication

// Function to get token based on role (migrated from uni-app's storage usage)
export const getTokenByRole = (role = 'user') => {
  // Retrieve token for the specific role from localStorage
  return localStorage.getItem(`token_${role}`) || null;
};

// Function to clear tokens for all roles
export const clearAllTokens = () => {
  const roles = ['user', 'player', 'cs']; // Adjust roles as needed
  roles.forEach(role => {
    localStorage.removeItem(`token_${role}`);
  });
  localStorage.removeItem('app_role'); // Also clear the stored role
};

// Function to check if any user is logged in
export const isAnyUserLoggedIn = () => {
  const roles = ['user', 'player', 'cs'];
  return roles.some(role => !!getTokenByRole(role));
};
