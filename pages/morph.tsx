import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  checkIfWalletIsConnected,
  connectWallet,
  morph,
} from "../utils/eth_helpers";

const TWITTER_HANDLE = "mightymorphs";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export default function Morph() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

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
          <a href={"/"}>
            <img
              className={styles.logo}
              src="/mightymorphs.png"
              alt="mightymorphs"
            />
          </a>
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
        <form className={styles.bodyContainer}>
          <div className={styles.description}>
            Paste in the new image URL you'd like to use and click the button
            below to morph. You'll be prompted to sign and won't be charged any
            gas.
          </div>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            placeholder="New image URL"
            value={newImageURL}
            onChange={(e) => setNewImageURL(e.target.value)}
          />
          <div
            className={
              currentAccount === ""
                ? styles.buttonInactive
                : styles.buttonActive
            }
            onClick={
              currentAccount === "" ? () => {} : () => morph(newImageURL)
            }
          >
            {currentAccount === ""
              ? "Connect wallet to morph"
              : "Morph your NFT"}
          </div>
        </form>
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
