import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  checkIfWalletIsConnected,
  mint,
  setupMintListener,
} from "../utils/eth_helpers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [mintedURL, setMintedURL] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
  }, []);

  useEffect(() => {
    setupMintListener(setMintedURL, setIsMinting, setSuccess);
  }, [currentAccount]);

  useEffect(() => {
    if (mintedURL.length > 0) {
      window.open(mintedURL, "_blank");
    }
  }, [mintedURL]);

  return (
    <div className={styles.app}>
      <Head>
        <title>MightyMorphs</title>
        <meta name="description" content="It's Morphin' Time!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        />
        <div className={styles.bodyContainer}>
          <div className={styles.description}>
            MightyMorphs are dynamic NFTs that allow you to change your unique
            image any time with no gas fees.
            <br />
            <br />
            After minting,{" "}
            <a className={styles.description} href={"/morph"}>
              click here
            </a>{" "}
            to update the image to any publicly available URL and your NFT will
            update to the new image!
          </div>
          <div
            className={
              currentAccount === ""
                ? styles.buttonInactive
                : isMinting || success
                ? styles.buttonInactive
                : styles.buttonActive
            }
            onClick={
              currentAccount === ""
                ? () => {}
                : isMinting || success
                ? () => {}
                : () => mint(setIsMinting, setSuccess)
            }
          >
            {currentAccount === ""
              ? "Connect wallet to mint"
              : isMinting
              ? "Minting, please wait..."
              : success
              ? "Your Mighty Morph is minted!"
              : "Mint Mighty Morph for 0.1 Ξ"}
          </div>
          <a className={styles.whyCare} href={"/uses"}>
            Why should I mint?
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
