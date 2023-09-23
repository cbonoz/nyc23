import { ethers } from "ethers";
import { USER_CONTRACT } from "../util/metadata";

const getVeritificationString = (network, name, purpose, chainId, cid, offerPrice, offerDescription, consultFee) => {
    return `npx hardhat verify --network ${network} ${name} ${purpose} ${chainId} ${cid} ${offerPrice} ${offerDescription} ${consultFee}`;
}

export async function deployContract(signer, name, purpose, chainId, cid, offerPrice, offerDescription, consultFee, verify) {
    // Deploy contract with ethers
    const factory = new ethers.ContractFactory(
        USER_CONTRACT.abi,
        USER_CONTRACT.bytecode,
        signer
    );

    // Convert prices to wei
    offerPrice = ethers.utils.parseEther(offerPrice.toString());
    consultFee = ethers.utils.parseEther(consultFee.toString());
    const contract = await factory.deploy(name, purpose, chainId, cid, offerPrice, offerDescription, consultFee);
    // log
    console.log("Deploying contract...", name, purpose, chainId, cid, offerPrice, offerDescription, consultFee);
    await contract.deployed();
    console.log("deployed contract...", contract.address);
    if (true) {

        // const newContract = new ethers.Contract(contract.address, USER_CONTRACT.bytecode, signer);
        const tx = await contract.verify();

        const receipt = await tx.wait();

        if (receipt.status === 1) {
            console.log("Contract verified successfully!");
        } else {
            console.log("Failed to verify contract!");
        }
    }
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

export async function purchaseAccess(signer, contractAddress, price) {
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