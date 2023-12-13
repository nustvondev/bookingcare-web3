import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    // "https://sepolia.infura.io/v3/185384fa1812467fb84a083fb7a72df5"
    "https://eth-sepolia.g.alchemy.com/v2/NGkch_-xXWwtpvdV_XuQYkwla2B_tJRr"
  );
  web3 = new Web3(provider);
}

export default web3;
