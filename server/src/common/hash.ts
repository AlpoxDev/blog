import bcyrpt from 'bcryptjs';

const SALT_ROUNDS = 14;

export const createPassword = async (password: string): Promise<string> => {
  const salt = await bcyrpt.genSalt(10);
  const hash = await bcyrpt.hash(password, salt);

  return hash;
};

export const comparePassword = async (
  inputPassword: string,
  password: string
): Promise<boolean> => {
  return await bcyrpt.compare(inputPassword, password);
};
