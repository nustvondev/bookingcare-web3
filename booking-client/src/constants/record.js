import web3 from "./web3";
import Record from "./Record.json";

const instance = new web3.eth.Contract(
  Record.abi,
  "0x86d844296e72eE1b0A460A3E4Ef49237a7c017a5"
);

export default instance;
