'use client'
import React, { useState } from 'react';
import { ethers } from 'ethers';
import DonationContractABI from '../../../artifacts/contracts/DonationContract.sol/DonationContract.json';
import Header from "./components/Header";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "DonationForm.css"; // Replace with your CSS file path
document.head.appendChild(link);

const DonationForm = ({ contractAddress }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      setTransactionStatus("Please enter a valid donation amount in ETH.");
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, DonationContractABI.abi, signer);

      try {
        setIsLoading(true);
        setTransactionStatus("Processing donation...");
        const tx = await contract.donate({ value: ethers.parseEther(donationAmount) });
        await tx.wait();
        setTransactionStatus("Donation successful!");
        setDonationAmount("");
      } catch (error) {
        console.error("Transaction failed:", error);
        setTransactionStatus("Donation failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please install MetaMask to make a donation!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <Header /> // Header component imported
      <form onSubmit={handleDonate} className="space-y-4">
        <label htmlFor="donationAmount" className="block text-gray-700 font-medium">
          Donation Amount (ETH):
        </label>
        <input
          type="text"
          id="donationAmount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader border-t-transparent border-4 border-white w-4 h-4 rounded-full animate-spin"></div>
          ) : (
            "Donate"
          )}
        </button>
      </form>
      {transactionStatus && (
        <p
          className={`mt-4 text-center ${
            transactionStatus.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {transactionStatus}
        </p>
      )}
    </div>
  );
};

export default DonationForm;