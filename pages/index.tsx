import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  checkIfWalletIsConnected,
  connectWallet,
  mint,
} from "../utils/eth_helpers";

const TWITTER_HANDLE = "mightymorphs";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
  }, []);

  return (
    <div className={styles.app}>
      <Head>
        <title>MightyMorphs</title>
        <meta name="description" content="It's Morphin' Time!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <img
            className={styles.logo}
            src="/mightymorphs.png"
            alt="mightymorphs"
          />
          {currentAccount === "" ? (
            <div
              className={styles.connectWalletButton}
              onClick={() => connectWallet(setCurrentAccount)}
            >
              Connect wallet
            </div>
          ) : (
            <div></div>
          )}
        </div>
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
                : styles.buttonActive
            }
            onClick={currentAccount === "" ? () => {} : () => mint()}
          >
            {currentAccount === ""
              ? "Connect wallet to mint"
              : "Mint Mighty Morph for 0.1 Ξ"}
          </div>
          <a className={styles.whyCare} href={"/uses"}>
            Why should I mint?
          </a>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <a
          className={styles.title}
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`@${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  );
}
