export const LOGIN_MESSASGE = (nonce: string) =>
  `Welcome to SplitMate!\n\nThis message is necessary to authenticate to the dApp.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nNonce: ${nonce}`;
