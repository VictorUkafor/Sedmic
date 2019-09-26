
export const validateUsername = (username, required = true) => {
  if (!username.length) {
    return {
      message: 'Your username is required',
      status: false,
    };
  }

  if (username.length < 7 && required) {
    return {
      message: 'Username should atleast 7 characters long',
      status: false,
    };
  }

  if (username.length > 30 && required) {
    return {
      message: 'Username should not be more than 30 characters long',
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


export const validateUsername2 = (name, length) => {
  if (!name.length) {
    return {
      message: 'Church username is required',
      status: false,
    };
  }

  if (name.length > length) {
    return {
      message: `Username should contain maximum of ${length} characters`,
      status: false,
    };
  }


  if (/\s/.test(name)) {
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


export const validatePhone = (phone, required = true, length = false) => {
  const numberFormat = /^\d+$/;
  if (!phone.length && required) {
    return {
      message: 'Your mobile number is required',
      status: false,
    };
  }

  if (phone.length && !numberFormat.test(phone)) {
    return {
      message: 'Mobile number must contain digits only',
      status: false,
    };
  }

  if (phone && (phone.length < length)) {
    return {
      message: 'Mobile number must be 11 digits',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validateEmail = (email, required = true) => {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.length && required) {
    return {
      message: 'Your email address is required',
      status: false,
    };
  }

  if (email.length && !emailFormat.test(email)) {
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

export const validateCode = (code) => {
  const numberFormat = /^\d+$/;
  if (!code.length) {
    return {
      message: 'Your verification code is required',
      status: false,
    };
  }

  if (!numberFormat.test(code)) {
    return {
      message: 'Please enter just the numbers',
      status: false,
    };
  }

  if (code.length !== 7) {
    return {
      message: 'Your verification code should be 7',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validateFullName = (fullname, name) => {
  if (!fullname.length) {
    return {
      message: `Your ${name} is required`,
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validateGender = (gender) => {
  if (!gender.length) {
    return {
      message: 'Please select your gender',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validateImage = (image, required = true) => {
  const imageFormat = /\.(gif|jpg|jpeg|tiff|png)$/i;
  if (!image.length && required) {
    return {
      message: 'Please upload an image',
      status: false,
    };
  }

  if (image.length && !imageFormat.test(image)) {
    return {
      message: 'Please upload a valid image',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validateDOB = (date, required = true) => {
  const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  if (!date.length && required) {
    return {
      message: 'Please enter your date of birth',
      status: false,
    };
  }

  if (date.length && !dateFormat.test(date)) {
    return {
      message: 'Please use this format: DD/MM/YYYY',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validatePassword = (password, check = true) => {
  const passwordFormat = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
  if (!password.length) {
    return {
      message: 'Your password is required',
      status: false,
    };
  }

  if (password.length < 7 && check) {
    return {
      message: 'Your password must be atleast 7 characters',
      status: false,
    };
  }

  if (password.length > 30 && check) {
    return {
      message: 'Your password should not be more than 30 characters long',
      status: false,
    };
  }

  if (/\s/.test(password) && check) {
    return {
      message: 'Your password should not contain spaces',
      status: false,
    };
  }

  if (!passwordFormat.test(password) && check) {
    return {
      message: 'Your password must a combination of letters and number',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};


export const validatePasswordConfirmation = (password, passwordConf) => {
  if (!password.length) {
    return {
      message: 'The password field is required',
      status: false,
    };
  }

  if (!passwordConf.length) {
    return {
      message: 'Your password confirmation is required',
      status: false,
    };
  }

  if (password !== passwordConf) {
    return {
      message: 'Your passwords do not match',
      status: false,
    };
  }

  return {
    message: '',
    status: true,
  };
};
