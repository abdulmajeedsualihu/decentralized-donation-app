import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DonationContractABI from "../../artifacts/contracts/DonationContract.sol/DonationContract.json";

const WithdrawFunds = ({ contractAddress }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to check if the connected account is the owner
  const checkIfOwner = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []); // Add `await`
        const signer = await provider.getSigner(accounts[0]);

        const contract = new ethers.Contract(
          contractAddress,
          DonationContractABI.abi,
          signer
        );

        const owner = await contract.owner(); // Retrieve owner address from the contract

        // Compare owner's address to the connected account
        const connectedAddress = await signer.getAddress();
        setIsOwner(owner.toLowerCase() === connectedAddress.toLowerCase());
      } else {
        setErrorMessage("Please install MetaMask to use this feature!");
      }
    } catch (error) {
      console.error("Error checking owner status:", error);
      setErrorMessage("An error occurred while checking ownership. Please try again later.");
    }
  };

  // Function to handle fund withdrawal
  const handleWithdraw = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          DonationContractABI.abi,
          signer
        );

        setIsLoading(true);
        setTransactionStatus("Processing withdrawal...");
        const tx = await contract.withdraw();
        await tx.wait();
        setTransactionStatus("Funds withdrawn successfully!");
        setIsLoading(false);
      } else {
        setErrorMessage("Please install MetaMask to use this feature!");
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setTransactionStatus("");
      setErrorMessage("Withdrawal failed. Please try again later.");
      setIsLoading(false);
    }
  };

  // Check if the connected account is the owner when the component mounts
  useEffect(() => {
    checkIfOwner();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      {isOwner ? (
        <div>
          <button
            onClick={handleWithdraw}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded ${
              isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Processing..." : "Withdraw Funds"}
          </button>
          {transactionStatus && <p className="mt-4 text-green-600">{transactionStatus}</p>}
          {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          You are not authorized to withdraw funds.
        </p>
      )}
    </div>
  );
};

export default WithdrawFunds;