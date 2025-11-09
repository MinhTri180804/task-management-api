type VerifyEmailRegisterTemplate = {
  otp: string;
  expiredAt: Date;
};

export default function verifyEmailRegisterTemplate({
  otp,
  expiredAt,
}: VerifyEmailRegisterTemplate) {
  const expiredAtFormat = Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(expiredAt));
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
