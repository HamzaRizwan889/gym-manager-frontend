// authService.js
const tokenKey = "token";
const userIdKey = "userId"; 

export function login(token, userId) {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userIdKey, userId); // Store user ID in local storage
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userIdKey); // Remove user ID from local storage
}

export function getAuthToken() {
  return localStorage.getItem(tokenKey);
}

export function getUserId() {
  return localStorage.getItem(userIdKey); // Retrieve user ID from local storage
}
