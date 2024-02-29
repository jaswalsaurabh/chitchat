const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID,
    },
  },
};

export default awsconfig;
