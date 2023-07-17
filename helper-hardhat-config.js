const networkConfig = {
  default: {
    name: "hardhat",
    ltk: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  },
  31337: {
    name: "localhost",
    ltk: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
};
