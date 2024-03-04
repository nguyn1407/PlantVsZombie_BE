interface ITokenType {
  ACCESS: string,
  REFRESH: string,
  RESET_PASSWORD: string,
  VERIFY_EMAIL: string,
}

const tokenTypes: ITokenType = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

export default tokenTypes