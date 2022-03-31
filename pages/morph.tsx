import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { checkIfWalletIsConnected, morph } from "../utils/eth_helpers";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        <Header
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        />
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
      <Footer />
    </div>
  );
}
