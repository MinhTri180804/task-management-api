import * as bcrypt from 'bcrypt';

export const hashPassword = async ({
  password,
}: {
  password: string;
}): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async ({
  password,
  hashPassword,
}: {
  password: string;
  hashPassword: string;
}): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
