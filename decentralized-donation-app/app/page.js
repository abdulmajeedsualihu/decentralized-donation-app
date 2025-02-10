"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnect from "./components/WalletConnect";
import DonationContractABI from "../../artifacts/contracts/DonationContract.sol/DonationContract.json"; // In the root directory of this project, copy and paste your artifacts folder from your donation contract project!

export default function Home() {
  const [totalDonations, setTotalDonations] = useState("0");
  const [donors, setDonors] = useState([]);
  const contractAddress = "0x6cc6B82a66488576eAF1Bef537B3C4EA1b421a36"; // Replace with your contract address

  // Function to fetch donation information
  const fetchDonationInfo = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        DonationContractABI.abi,
        provider
      );

      try {
        // Fetch the total donations
        const total = await contract.totalDonations();
        setTotalDonations(ethers.utils.formatEther(total));

        // Fetch and format the list of donors
        // (This part depends on how you track donors; adjust if needed)
        // For simplicity, let's assume you have a method to fetch donors' addresses and amounts
        // Here we simulate fetching donor data
        const simulatedDonors = [
          { address: "0x123...abc", amount: "1.5 ETH" },
          { address: "0x456...def", amount: "2.0 ETH" },
        ];
        setDonors(simulatedDonors);
      } catch (error) {
        console.error("Error fetching donation info:", error);
      }
    }
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    fetchDonationInfo();
  }, []);

  return (
    <div>
      <h1>Welcome to the Decentralized Donation App</h1>
      <WalletConnect />
      <h2>Total Donations: {totalDonations} ETH</h2>

      <h3>List of Donors:</h3>
      <ul>
        {donors.map((donor, index) => (
          <li key={index}>
            {donor.address}: {donor.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}