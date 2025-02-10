const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationContract", function () {
    let donation, owner, donor1, donor2;

    beforeEach(async function () {
        // Deploy the contract before each test
          [owner, donor1, donor2] = await ethers.getSigners();
  
      donation = await ethers.deployContract("DonationContract");
    });

    it("should accept donations and update totalDonations", async function () {
        // Donor1 sends 1 ETH
        await donation.connect(donor1).donate({ value: ethers.parseEther("1") });
        expect(await donation.totalDonations()).to.equal(ethers.parseEther("1"));
        expect(await donation.donations(donor1.address)).to.equal(ethers.parseEther("1"));

        // Donor2 sends 2 ETH
        await donation.connect(donor2).donate({ value: ethers.parseEther("2") });
        expect(await donation.totalDonations()).to.equal(ethers.parseEther("3"));
        expect(await donation.donations(donor2.address)).to.equal(ethers.parseEther("2"));
    });

    it("should reject donations of zero ETH", async function () {
        await expect(donation.connect(donor1).donate({ value: 0 })).to.be.revertedWith("Donation must be greater than zero");
    });

    it("should only allow the owner to withdraw funds", async function () {
        // Donor1 sends 1 ETH
        await donation.connect(donor1).donate({ value: ethers.parseEther("1") });
    
        // Non-owner tries to withdraw and should fail
        await expect(donation.connect(donor1).withdraw()).to.be.revertedWith("Only the owner can withdraw funds");
    
        // Owner withdraws funds successfully
        const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    
        // Withdraw funds
        const tx = await donation.connect(owner).withdraw();
        const receipt = await tx.wait();
    
        // Calculate gas used
        const gasUsed = receipt.gasUsed * receipt.gasPrice; 
    
        // Final owner balance
        const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
    
        // Validate the owner's final balance (initial + 1 ETH - gasUsed)
        expect(finalOwnerBalance).to.equal(initialOwnerBalance + (ethers.parseEther("1")) - gasUsed);
    });

    it("should revert if there are no funds to withdraw", async function () {
        await expect(donation.connect(owner).withdraw()).to.be.revertedWith("No funds to withdraw");
    });
});