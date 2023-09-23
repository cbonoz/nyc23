pragma solidity ^0.8.0;
// License
// SPDX-License-Identifier: MIT

contract UserContract {

  address public deployer;
  bool public active;
  string public name;
  string public purpose;
  uint256 public chainId;
  mapping(address => bool) public hasAccess;

  constructor(string memory _name, string memory _purpose, uint256 _chainId) {
    deployer = msg.sender;
    active = true;
    name = _name;
    purpose = _purpose;
    chainId = _chainId;
  }

  // function purchaseAccess() public payable returns (string memory) {
  //   require(active, "Contract was marked inactive by creator");
  //   if (price != 0) {
  //     require(msg.value == price, "Incorrect price, please call contract with nonzero value");
  //     // Transfer to deployer.
  //     payable(deployer).transfer(msg.value);
  //   }
  //   hasAccess[msg.sender] = true;
  //   return cid;
  // }

  // // get price
  //   function getPrice() public view returns (uint256) {
  //       return price;
  //   }

  // function getCid(address _address) public view returns (string memory) {
  //   require(hasAccess[_address], "Call purchaseAccess to get cid");
  //   return cid;
  // }

  // function changePrice(uint256 _newPrice) public {
  //   require(msg.sender == deployer);
  //   price = _newPrice;
  // }

  function toggleActive() public {
    require(msg.sender == deployer);
    active = !active;
  }

  function getMetadata() public view returns (string memory, string memory) {
    return (name, purpose);
  }

}
