import { ethers, utils } from "ethers";
import mightyMorphs from "./MightyMorphs.json";

export const checkIfWalletIsConnected = async (
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!(window as any).ethereum) {
    console.log(
      "Browser not compatible. Make sure you have a wallet installed."
    );
    return;
  }

  const accounts = await (window as any).ethereum.request({
    method: "eth_accounts",
  });
  if (accounts.length !== 0) {
    const account = accounts[0];
    setCurrentAccount(account);
  }
};

export const connectWallet = async (
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    if (!(window as any).ethereum) {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
      return;
    }

    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

export const mint = async () => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        mightyMorphs.abi,
        signer
      );

      let txn = await connectedContract.mint({
        value: utils.parseEther("0.1"),
      });
      await txn.wait();
    } else {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const withdraw = async () => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        mightyMorphs.abi,
        signer
      );

      let withdrawal = await connectedContract.withdraw();
      await withdrawal.wait();
    } else {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const setupMintListener = async () => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        mightyMorphs.abi,
        signer
      );

      connectedContract.on("NewMightyMorphMinted", (from, tokenId) => {
        console.log(
          `https://opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
        );
      });
    } else {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
    }
  } catch (error) {
    console.log(error);
  }
};
