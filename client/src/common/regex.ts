const REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD: /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*_]{8,20}$/,
  NICKNAME: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
};

export const isEmail = (email: string): boolean => {
  return REGEX.EMAIL.test(email);
};

export const isPassword = (password: string): boolean => {
  return REGEX.PASSWORD.test(password);
};

export const isNickname = (nickname: string): boolean => {
  return REGEX.NICKNAME.test(nickname);
};
