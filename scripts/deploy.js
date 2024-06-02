const hre = require("hardhat");


async function main() {
    console.log('deploying')
    const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();
    console.log("SupplyChain deployed to:", supplyChain.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// celo Alfa Address = 0x76d462Eb3FB3096e3d1E1Cd80B029Ed259b8d0E6