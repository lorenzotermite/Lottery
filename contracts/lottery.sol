// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** 
*@title Lottery contract
*@author Lorenzo Termite
*@notice This contract is for creating a sample raffle
*
*/
contract LotteryContract is Ownable{
event EnterRaffle(uint256 ticketNUmber,ticket ticketUser);
using Counters for Counters.Counter;
uint immutable  ticketAmount=100 * 10 **18;
uint256 private ticketNumber;
IERC20 public immutable coin;
bool pickWinnerAlready=false;
uint8 counterUser;

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


//da frontend viene passato l'amount gia in decimals
function enterRaffle(uint256 amount)external  {
require(amount>=ticketAmount,"Not enough for the ticket");
require(counterUser<10,"Max partecipant reached");
//counter max partecipant to raffle so that when it is finished it is reset
counterUser++;
ticketNumber++;
TicketForUser[ticketNumber]=ticket(msg.sender,false);
coin.transferFrom(msg.sender,address(this),amount);//è inutile fare il refound il metodo inviera solo il valore corretto

emit EnterRaffle(ticketNumber, TicketForUser[ticketNumber]);
 

} 

function pickWinner(uint _ticketNumber)external view returns(bool){
    require(TicketForUser[_ticketNumber].user==msg.sender,"Ticket number not exist" );
    
    if (TicketForUser[_ticketNumber].WinorLose){
        return true;
    }else{ return false;}
   
   
}

function checkWinner()external  onlyOwner(){
    //check if the random pick winner is already used
require(pickWinnerAlready != false,"Already pick winner");
require(counterUser==10,"Max partecipant not enough"); 
pickWinnerAlready=true;
counterUser=0;
//random pick
TicketForUser[3].WinorLose=true;
//trasfer win at user
coin.transfer(msg.sender,100);
}

function _coin()external view returns (address){
    return address(coin);
}

function _TicketForUser(uint ticket)external view  returns(address){
    return address(TicketForUser[ticket].user);

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