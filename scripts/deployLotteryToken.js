const { ethers } = require("hardhat");

async function deployLtk() {
  const lotteryInstance = await ethers.deployContract("LotteryToken");
  await lotteryInstance.waitForDeployment();

  console.log(`LotteryToken deployed to ${lotteryInstance.target}`);
}

module.exports = {
  deployLtk,
};
