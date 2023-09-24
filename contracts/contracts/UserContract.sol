pragma solidity ^0.8.19;

// License
// SPDX-License-Identifier: MIT

contract UserContract {
    address public deployer;
    bool public active;
    string public name;
    string public purpose;
    uint256 public chainId;
    string public ens;

    struct Offer {
        // price and description
        uint256 price;
        string description;
        string cid;
    }

    // TODO: add offers
    Offer public offer;
    uint256 public consultFee;

    mapping(address => bool) public hasAccess;

    constructor(
        string memory _name,
        string memory _purpose,
        uint256 _chainId,
        string memory _cid,
        uint256 _price,
        string memory _description,
        uint256 _consultFee,
        string memory _ens
    ) {
        deployer = msg.sender;
        active = true;
        name = _name;
        purpose = _purpose;
        chainId = _chainId;
        offer = Offer(_price, _description, _cid);
        consultFee = _consultFee;
        ens = _ens;
    }

    // Contract emits.
    event PurchaseEvent(address indexed _address, string _cid);
    event ConsultEvent(address indexed _address, uint256 _consultFee);

    function purchaseAccess() public payable returns (string memory) {
        require(active, "Contract was marked inactive by creator");
        if (offer.price != 0 && !hasAccess[msg.sender]) {
            require(
                msg.value == offer.price,
                "Incorrect price, please call contract with nonzero value"
            );
            // Transfer to deployer.
            payable(deployer).transfer(msg.value);
        }
        emit PurchaseEvent(msg.sender, offer.cid);
        hasAccess[msg.sender] = true;
        return offer.cid;
    }

    function purchaseConsult() public payable {
        require(active, "Contract was marked inactive by creator");
        if (consultFee != 0) {
            require(
                msg.value == consultFee,
                "Incorrect price, please call contract with nonzero value"
            );
            // Transfer to deployer.
            payable(deployer).transfer(msg.value);
        }

        emit ConsultEvent(msg.sender, consultFee);
    }

    // get price
    function getPrice() public view returns (uint256) {
        return offer.price;
    }

    function getCid(address _address) public view returns (string memory) {
        require(hasAccess[_address], "Call purchaseAccess to get cid");
        return offer.cid;
    }

    function changePrice(uint256 _newPrice) public {
        require(msg.sender == deployer);
        offer.price = _newPrice;
    }

    function toggleActive() public {
        require(msg.sender == deployer);
        active = !active;
    }

    function getMetadata()
        public
        view
        returns (
            string memory,
            string memory,
            Offer memory,
            uint256,
            string memory,
            uint256,
            address
        )
    {
        return (name, purpose, offer, consultFee, ens, chainId, deployer);
    }
}
