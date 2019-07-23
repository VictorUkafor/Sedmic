export default {
  location: {},
  username: localStorage.getItem('username') || '',
  successMessage: '',
  errorMessage: '',
  checks: [],
  setCode: localStorage.getItem('setCode') || false,
  tokenUser: {},
  user: {},
  auth: localStorage.getItem('auth') || false,
  authToken: localStorage.getItem('authToken') || false,
  reset: false,
  tokenSent: localStorage.getItem('tokenSent') || false,
  linkSent: localStorage.getItem('linkSent') || false,
  churchCreated: localStorage.getItem('churchCreated') || false,
  activationToken: localStorage.getItem('activation_token') || null,
};
