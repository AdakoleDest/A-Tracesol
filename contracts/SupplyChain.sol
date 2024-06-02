// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        string name;
        string location;
        address manufacturer;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductRegistered(uint256 productId, string name, string location, address manufacturer);

    function registerProduct(string memory name, string memory location) public {
        productCount++;
        products[productCount] = Product(name, location, msg.sender);
        emit ProductRegistered(productCount, name, location, msg.sender);
    }

    function traceProduct(uint256 productId) public view returns (string memory name, string memory location, address manufacturer) {
        Product memory product = products[productId];
        return (product.name, product.location, product.manufacturer);
    }
}
