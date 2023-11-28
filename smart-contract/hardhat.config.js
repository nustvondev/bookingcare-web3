require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/NGkch_-xXWwtpvdV_XuQYkwla2B_tJRr`,
      accounts: [
        `0xcb6672b4bc1e63053c1e0fa7d99a4c39bff5b32f1e5d6596bbde92e9ea8f7f96`,
      ],
      chainId: 11155111,
    },
  },
};
