import { BigNumber } from "ethers";
import { ACTIVE_CHAIN, IPFS_BASE_URL } from "../constants";

export function addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
}

export const abbreviate = s => s ? `${s.substr(0, 6)}**` : ''


export const formatDate = (d) => {
    if (!(d instanceof Date)) {
        d = new Date(d)
    }
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}


export const ipfsUrl = (cid, fileName) => {
    // let url = `https://ipfs.io/ipfs/${cid}`;
    let url = `${IPFS_BASE_URL}/${cid}`
    if (fileName) {
      return `${url}/${fileName}`;
    }
    return url;
  };

export const insureUrl = (cid) => `${window.location.origin}/policy/${cid}`;

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getExplorerUrl = (hash, useTx) =>
  `${ACTIVE_CHAIN.url}${useTx ? "tx/" : "address/"}${hash}`;

export const createJsonFile = (signload, fileName) => {
  const st = JSON.stringify(signload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const col = (k, render) => ({
  title: capitalize(k).replaceAll('_', ' '),
  dataIndex: k,
  key: k,
  render,
});

export const humanError = message => {
  if (message.indexOf('invalid address') !== -1) {
    message = 'Invalid address. Please check the policy address url and try again.'
  } else if (message.indexOf('404') !== -1) {
    message = 'Insure not found. Do you have the correct url? Otherwise, try creating a new insure.'
  } else if (message.indexOf('network changed') !== -1) {
    message = 'Network changed since page loaded, please refresh.'
  } else if (message.indexOf("estimate gas") !== -1) {
    return `Execution reverted - Contract may have insufficient funds or a gas estimation error. Try sending .1 link for the oracle payment to the above address.`
  }
  return capitalize(message);
}

export const isEmpty = s => !s || s.length === 0


export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}