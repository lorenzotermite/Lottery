const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, assert } = require("chai");
const { network, ethers } = require("hardhat");

const { networkConfig } = require("../helper-hardhat-config");

describe("Lottery", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployLotteryContract() {
    const [owner, otherAccount] = await ethers.getSigner();
    const chainId = network.config.chainId;
    const [LotteryTokenAddress] = networkConfig[chainId];

    const LotteryContractInstance = await ethers.getContractFactory(
      "LoteryContract"
    );
    const LotteryContract = await LotteryContractInstance.deploy(
      LotteryTokenAddress
    );

    return { LotteryContract, owner, otherAccount };
  }

  async function deployLotteryToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ltk = await ethers.getContractFactory("LotteryToken");
    const LotteryToken = await ltk.deploy();

    return { LotteryToken };
  }
});
