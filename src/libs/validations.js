export const validateUsername = (username, allUsers) => {
  if (username.length < 7) {
    return {
      message: 'Username should atleast 7 characters long',
      status: false,
    };
  }

  if (allUsers.includes(btoa(username))) {
    return {
      message: 'Username has been taken',
      status: false,
    };
  }

  if (/\s/.test(username)) {
    return {
      message: 'Username should not contain any space',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validatePhone = (phone) => {
  const numberFormat = /^\d+$/;
  if (!phone.length) {
    return {
      message: 'Your mobile number is required',
      status: false,
    };
  }

  if (!numberFormat.test(phone)) {
    return {
      message: 'Mobile number must contain digits only',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validateEmail = (email) => {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.length) {
    return {
      message: 'Your email address is required',
      status: false,
    };
  }

  if (!emailFormat.test(email)) {
    return {
      message: 'Please enter a valid email address',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};
