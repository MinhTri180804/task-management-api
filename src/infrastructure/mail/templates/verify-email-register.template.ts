import { dateTimeFormat } from '@shared/utils/time-format.util';

type VerifyEmailRegisterTemplate = {
  otp: string;
  expiredAt: Date;
};

export default function verifyEmailRegisterTemplate({
  otp,
  expiredAt,
}: VerifyEmailRegisterTemplate) {
  const expiredAtFormat = dateTimeFormat(expiredAt);
  return `
        <div>
            <h2>Verify email register</h2>
        </div>
        <div>
            <p>OTP: <b>${otp}</b></p>
        </div>
        <div>
            <p>Expired at: <b>${expiredAtFormat}</b></p>
        </div>
    `;
}
