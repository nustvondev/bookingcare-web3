const hre = require("hardhat");

async function main() {
  try {
    const Record = await hre.ethers.getContractFactory("Record");
    const record = await Record.deploy();
    await record.deploymentTransaction().wait(2);
    console.log(`Contract deploy at: ${record.target}`);
  } catch (error) {
    console.log(error);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
