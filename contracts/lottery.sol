// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.SOL";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** 
*@title Lottery contract
*@author Lorenzo Termite
*@notice This contract is for creating a sample raffle
*
*/
contract LotteryContract is Ownable{

using Counters for Counters.Counter;
uint immutable  ticketAmount=100;
uint256 private ticketNumber;
IERC20 immutable coin;

struct ticket {
     address  user;
    bool WinorLose;
}
mapping(uint256 =>ticket) TicketForUser;


//////////////
///EXTERNAL///
//////////////
constructor(IERC20 _coin)  Ownable(){
    require(address(_coin)!=address(0),"Address 0");
    coin=_coin;

}



function enterRaffle(uint amount)external  {
require(amount>=ticketAmount,"Not enough for the ticket");

ticketNumber++;
TicketForUser[ticketNumber]=ticket(msg.sender,false);

if(amount>ticketAmount){
    uint refound=amount-ticketAmount;
   coin.transfer(msg.sender,refound);
}
coin.transfer(address(this),ticketAmount);
}

function pickWinner(uint _ticketNumber)external returns(bool){
    require(TicketForUser[ticketNumber].user==msg.sender,"Ticket number not exist" );
    
    if (TicketForUser[ticketNumber].WinorLose){
        return true;
    }else{ return false;}
   
   
}

function checkWinner()external onlyOwner(){

TicketForUser[3].WinorLose=true;
//trasfer win at user
coin.transfer(address(this),100);
}




////////////
///PUBLIC///
////////////

//////////////
///INTERNAL///
//////////////

/////////////
///PRIVATE///
/////////////

}