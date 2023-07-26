const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, assert } = require("chai");
const { network, ethers } = require("hardhat");

const { networkConfig } = require("../helper-hardhat-config");

describe("Initial", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployLotteryTokenFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ltk = await ethers.getContractFactory("LotteryToken");
    const LTK = await ltk.deploy();

    return { LTK };
  }

  async function deployLotteryContractFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const { LTK } = await loadFixture(deployLotteryTokenFixture);
    // const chainId = network.config.chainId;

    // const ltk = networkConfig[chainId].ltk;

    const LotteryContractInstance = await ethers.getContractFactory(
      "LotteryContract"
    );
    const LotteryContract = await LotteryContractInstance.deploy(LTK);

    return { LotteryContract, owner, otherAccount };
  }

  describe("LotteryContract", function () {
    it("enterRaffle", async function () {
      const { LTK } = await loadFixture(deployLotteryTokenFixture);
      const { LotteryContract, owner } = await loadFixture(
        deployLotteryContractFixture
      );
      console.log(await LTK.balanceOf(owner));
      const amount = ethers.parseEther("100");
      console.log("parseEther =" + amount);
      console.log("x =" + 100 * 10 ** 18);
      const x = 100 * 10 ** 18;
      console.log("x diviso 18 =" + x / 10 ** 18);

      const approveTx = await LTK.approve(LotteryContract.target, amount);
      await approveTx.wait(1);
      const enterRaffle = await LotteryContract.enterRaffle(amount);
      await enterRaffle.wait(1);

      console.log(await LTK.balanceOf(owner));
    });
  });
});
