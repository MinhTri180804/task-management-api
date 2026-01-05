import { Matches } from 'class-validator';

export function IsPasswordPattern(customMessage?: string) {
  const defaultMessage =
    'Password must be at least 8 characters long and include uppercase, lowercase, number and special character';
  return Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: customMessage ?? defaultMessage,
    },
  );
}
