type CreateProfileRegisterTemplatePrams = {
  email: string;
  token: string;
  expiresIn: number;
  redirectTo: string;
};
export default function createProfileRegisterTemplate({
  email,
  token,
  expiresIn,
  redirectTo,
}: CreateProfileRegisterTemplatePrams) {
  const expiresInFormat = Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(expiresIn * 1000));
  return `
        <h1>
            <h2>Verify email register success</h2>
        </h1>
        <h3>
            Create profile for email: ${email}
        </h3>
        <div>
        <a href="${redirectTo}?token=${token}" target="_blank"
         style="
           display: inline-block;
           padding: 10px 20px;
           background-color: #007bff;
           color: #ffffff;
           text-decoration: none;
           border-radius: 6px;
           font-weight: bold;
         ">
        Create Profile
      </a>
        </div>
        <div>Expires In ${expiresInFormat}</div>
    `;
}
