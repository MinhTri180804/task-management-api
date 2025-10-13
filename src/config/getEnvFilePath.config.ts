export const getEnvFilePath = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '.env.dev';

    case 'testing':
      return '.env.testing';

    case 'production':
      return '.env.prod';

    default:
      return '.env.dev';
  }
};
