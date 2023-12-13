import web3 from "./web3";
import Record from "./Record.json";

const instance = new web3.eth.Contract(
  Record.abi,
  "0xf0681D7F5B352BD3Fa5361f192D8162d2b22ee56"
);

export default instance;
