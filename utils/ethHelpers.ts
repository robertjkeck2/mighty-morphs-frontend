import { ethers, utils } from "ethers";
import mightyMorphs from "./MightyMorphs.json";
import {
  finalizeMintOnService,
  mintOnService,
  morphOnService,
} from "./service";

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

export const mint = async (
  setIsMinting: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setIsMinting(true);

      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        mightyMorphs.abi,
        signer
      );
      const address = await signer.getAddress();

      mintOnService(address).then(async (value: { address: string }) => {
        if (value.address) {
          await connectedContract
            .mint({
              value: utils.parseEther("0.1"),
            })
            .catch((err: Error) => {
              setIsMinting(false);
              console.log(err);
            });
        } else {
          setIsMinting(false);
          setSuccess(true);
          console.log("Address already minted.");
        }
      });
    } else {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
    }
  } catch (error) {
    setIsMinting(false);
    console.log(error);
  }
};

export const morph = async (
  newImageURL: string,
  setIsMorphing: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setIsMorphing(true);

      const signer = provider.getSigner();
      const token = await signer.signMessage(newImageURL);
      const address = await signer.getAddress();

      morphOnService(address, token, newImageURL).then(
        async (value: { address: string; url: string }) => {
          if (value.address && value.url) {
            setIsMorphing(false);
            setSuccess(true);
            window.open(value.url, "_blank");
          } else {
            setIsMorphing(false);
            console.log("Unable to morph. Try again.");
          }
        }
      );
    } else {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
    }
  } catch (error) {
    setIsMorphing(false);
    console.log(error);
  }
};

export const withdraw = async (
  setIsWithdrawing: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setIsWithdrawing(true);

      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        mightyMorphs.abi,
        signer
      );

      await connectedContract
        .withdraw()
        .then(() => {
          setSuccess(true);
          setIsWithdrawing(false);
        })
        .catch((err: Error) => {
          setIsWithdrawing(false);
          console.log(err);
        });
    } else {
      console.log(
        "Browser not compatible. Make sure you have a wallet installed."
      );
    }
  } catch (error) {
    setIsWithdrawing(false);
    console.log(error);
  }
};

export const setupMintListener = async (
  setIsMinting: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        mightyMorphs.abi,
        signer
      );

      connectedContract.on("NewMightyMorphMinted", async (from, tokenId) => {
        window.open(
          `https://opensea.io/assets/${
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
          }/${tokenId.toNumber()}`,
          "_blank"
        );
        setIsMinting(false);
        setSuccess(true);
        finalizeMintOnService(from, tokenId.toNumber());
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
