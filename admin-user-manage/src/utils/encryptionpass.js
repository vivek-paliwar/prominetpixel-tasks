import { compare, genSalt, hash } from 'bcryptjs';

const getEncryptedPass = async (password) => {
  const salt = await genSalt(10);
  const hashedpassword = await hash(password, salt);

  return hashedpassword;
};

const comparePassword = async (hashedpassword, password) => {
  const isauthenticated = await compare(password, hashedpassword);

  return isauthenticated;
};

export { getEncryptedPass, comparePassword };
