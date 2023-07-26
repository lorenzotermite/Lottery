// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LotteryToken is ERC20{

    constructor()ERC20("LotteryToken","LTK"){
        _mint(msg.sender, 200 * 10 ** decimals());

    }
}