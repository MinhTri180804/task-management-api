export const generateSecurePin = (length = 6): string => {
  if (length <= 0) {
    return '';
  }

  const value: number[] = [];

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    value.push(digit);
  }

  return value.join('');
};
