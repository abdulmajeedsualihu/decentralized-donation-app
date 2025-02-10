// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract DonationContract {
    // State variables
    address public owner;
    uint256 public totalDonations;
    mapping(address => uint256) public donations;

    // Events
    event DonationReceived(address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 amount);

    // Constructor: Sets the contract owner to the deployer
    constructor() {
        owner = msg.sender;
    }

    // Function to receive donations
    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than zero");

        donations[msg.sender] += msg.value;
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    // Function to withdraw all funds (only owner can call this)
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(balance);
    }
}