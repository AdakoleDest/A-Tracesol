require("@nomiclabs/hardhat-waffle");

require('dotenv').config()
console.log('PRIVATE_HASH', process.env.PRIVATE_HASH)

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            chainId: 1337
        },
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org", 
            accounts:
              process.env.PRIVATE_HASH !== undefined
                ? [process.env.PRIVATE_HASH]
                : [],
            chainId: 44787,
          },
    }
};
