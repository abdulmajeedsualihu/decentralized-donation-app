'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // Function to connect MetaMask wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Handle account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }
  }, []);

  return (
    <div>
      {walletAddress ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button className='px-4 py-2 bg-blue-600 text-white border-0 rounded-full cursor-pointer hover:bg-sky-700 text-sm font-bold' onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;