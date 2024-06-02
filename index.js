import { Signer, ethers } from "./ethers-5.7.esm.min.js";


        const connectButton = document.getElementById('connect');
        const accountDiv = document.getElementById('account');
        const registerProductButton = document.getElementById('registerProduct');
        const traceProductButton = document.getElementById('traceProduct');
        const productDetailsDiv = document.getElementById('productDetails');

        let signer;
        let supplyChainContract;

        const supplyChainAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const supplyChainAbi = [
            "function registerProduct(string memory name, string memory location) public",
            "function traceProduct(uint256 productId) public view returns (string memory name, string memory location, address manufacturer)"
        ];

        async function connect() {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    signer = provider.getSigner();
                    accountDiv.innerText = `Connected: ${await signer.getAddress()}`;
                    supplyChainContract = new ethers.Contract(supplyChainAddress, supplyChainAbi, signer);
                } catch (error) {
                    console.error('Error connecting to MetaMask', error);
                }
            } else {
                alert('MetaMask is not installed!');
            }
        }

        async function registerProduct() {
            const name = document.getElementById('productName').value;
            const location = document.getElementById('productLocation').value;
            try {
                const tx = await supplyChainContract.registerProduct(name, location);
                await tx.wait();
                alert('Product registered successfully!');
            } catch (error) {
                console.error('Error registering product', error);
            }
        }

        async function traceProduct() {
            const productId = document.getElementById('productId').value;
            try {
                const product = await supplyChainContract.traceProduct(productId);
                productDetailsDiv.innerText = `Name: ${product[0]}, Location: ${product[1]}, Manufacturer: ${product[2]}`;
            } catch (error) {
                console.error('Error tracing product', error);
                productDetailsDiv.innerText = 'Error tracing product!';
            }
        }

        connectButton.onclick = connect;
        registerProductButton.onclick = registerProduct;
        traceProductButton.onclick = traceProduct;