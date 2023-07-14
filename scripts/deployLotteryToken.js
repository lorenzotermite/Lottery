const { ethers } = require("hardhat");

async function deployToken() {
  const LotteryContract = await ethers.getContractFactory("LotteryToken");
  const lotteryInstance = await LotteryContract.deploy();

  await lotteryInstance.waitForDeployment();

  console.log(`Deploycontract at ${await lotteryInstance.getAddress()}`);
}

module.exports = {
  deployToken,
};
