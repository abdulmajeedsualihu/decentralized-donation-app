require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY
    }
  }
};
