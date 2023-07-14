const networkConfig = {
  default: {
    name: "hardhat",
    ltk: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  },
  31337: {
    name: "localhost",
    ltk: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
};
