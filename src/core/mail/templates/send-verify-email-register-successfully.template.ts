type CreateProfileRegisterTemplatePrams = {
  email: string;
  setPasswordToken: string;
};
export default function sendVerifyEmailRegisterSuccessfullyTemplate({
  email,
  setPasswordToken,
}: CreateProfileRegisterTemplatePrams) {
  return `
        <h1>
            <h2>Verify email register success</h2>
        </h1>
        <h3>
            Create profile for email: ${email}
        </h3>
        <h5>
            Please click the link below to set password
            </hr>
            ${setPasswordToken}
        </h5>
        <div>
        </div>
    `;
}
