import { dateTimeFormat } from '@shared/utils/time-format.util';

type ForgotPasswordTemplate = {
  token: string;
  expiresAt: number;
};

export default function forgotPasswordTemplate({
  token,
  expiresAt,
}: ForgotPasswordTemplate) {
  const expiresAtFormat = dateTimeFormat(expiresAt);
  return `
        <div>
            <h2>Forgot password </h2>
        </div>
        <div>
            <p>Token: <b>${token}</b></p>
        </div>
        <div>
            <p>Expired at: <b>${expiresAtFormat}</b></p>
        </div>
    `;
}
