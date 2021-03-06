import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  checkIfWalletIsConnected,
  mint,
  setupMintListener,
} from "../utils/ethHelpers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
  }, []);

  useEffect(() => {
    setupMintListener(setIsMinting, setSuccess);
  }, [currentAccount]);

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
            <a
              className={styles.link}
              href={"https://opensea.io/collection/mightymorphs"}
              rel="noreferrer"
              target="_blank"
            >
              MightyMorphs
            </a>{" "}
            are dynamic NFTs that allow you to change your unique image any time
            with no gas fees.
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
              : "Mint Mighty Morph for 0.1 ??"}
          </div>
          <div className={styles.description}>
            After minting,{" "}
            <a className={styles.link} href={"/morph"}>
              click here to morph
            </a>{" "}
            the image to any publicly available URL and your NFT will update in
            a few minutes!
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
