import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import twitterLogo from "../public/twitterLogo.svg";
import {
  checkIfWalletIsConnected,
  connectWallet,
  mint,
} from "../utils/eth_helpers";

const TWITTER_HANDLE = "mightymorphs";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const renderNotConnectedContainer = () => (
    <button
      onClick={() => connectWallet(setCurrentAccount)}
      className={[styles.ctaButton, styles.connectWalletButton]}
    >
      Connect to Wallet
    </button>
  );

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
          <p className={[styles.header, styles.gradientText]}>
            My NFT Collection
          </p>
          <p className={styles.subText}>
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button
              onClick={() => mint()}
              className={[styles.ctaButton, styles.connectWalletButton]}
            >
              Mint NFT
            </button>
          )}
        </div>
        <div className={styles.footerContainer}>
          <img
            alt="Twitter Logo"
            className={styles.twitterLogo}
            src={twitterLogo}
          />
          <a
            className={styles.footerText}
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`@${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}
