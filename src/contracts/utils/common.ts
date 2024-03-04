
export const getRPC = () => {
  // if (getChainIdFromEnv() === CHAIN_ID.MAINNET) {
  //   return process.env.NEXT_PUBLIC_RPC_MAINNET;
  // }
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

export const CONTRACT_ADDRESS = {
  PLANT_VS_ZOMBIE: "0xc27764d63266D1029377DF2D98d138AB50dB138f"
};