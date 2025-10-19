type Params = { length?: number };

export const generateSecurePin = ({ length = 6 }: Params): string => {
  const value: number[] = [];

  if (length <= 0) {
    return '';
  }

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    value.push(digit);
  }

  return value.join('');
};
