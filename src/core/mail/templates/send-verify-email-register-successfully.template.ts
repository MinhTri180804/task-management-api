type CreateProfileRegisterTemplatePrams = {
  email: string;
};
export default function sendVerifyEmailRegisterSuccessfullyTemplate({
  email,
}: CreateProfileRegisterTemplatePrams) {
  return `
        <h1>
            <h2>Verify email register success</h2>
        </h1>
        <h3>
            Create profile for email: ${email}
        </h3>
        <div>
        </div>
    `;
}
