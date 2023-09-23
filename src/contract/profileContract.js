import { ethers } from "ethers";
import { USER_CONTRACT } from "../util/metadata";

export async function deployContract(signer, name, purpose, chainId, cid, offerPrice, offerDescription, consultFee) {
    // Deploy contract with ethers
    const factory = new ethers.ContractFactory(
        USER_CONTRACT.abi,
        USER_CONTRACT.bytecode,
        signer
    );
    const contract = await factory.deploy(name, purpose, chainId, cid, offerPrice, offerDescription, consultFee);
    // log
    console.log("Deploying contract...", name, purpose);
    await contract.deployed();
    console.log("deployed contract...", contract.address);
    return contract;
}

export async function purchaseConsult(signer, contractAddress, price) {
    // Deploy contract with ethers
    const contract = new ethers.Contract(
        contractAddress,
        USER_CONTRACT.abi,
        signer
    );
    // log
    const tx = await contract.purchaseConsult({ value: price });
    await tx.wait();
    console.log("Purchased contract...", tx);
    return tx;
}

export async function purchaseOffer(signer, contractAddress, price) {
    // Deploy contract with ethers
    const contract = new ethers.Contract(
        contractAddress,
        USER_CONTRACT.abi,
        signer
    );
    // log
    const tx = await contract.purchaseAccess({ value: price });
    await tx.wait();
    console.log("Purchased contract...", tx);
    return tx;
}

// get Metadata
export async function getMetadata(signer, contractAddress) {
    // Deploy contract with ethers
    const contract = new ethers.Contract(
        contractAddress,
        USER_CONTRACT.abi,
        signer
    );
    // log
    const res = await contract.getMetadata();
    console.log("getMetadata...", res);
    return res;
}