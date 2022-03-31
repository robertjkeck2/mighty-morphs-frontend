import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { checkIfWalletIsConnected } from "../utils/eth_helpers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Uses() {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
  }, []);

  return (
    <div className={styles.app}>
      <Head>
        <title>MightyMorphs</title>
        <meta name="uses" content="It's Morphin' Time!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        />
        <div className={styles.bodyContainer}>
          <div className={styles.uses}>
            At their core, NFTs are simply an immutable record connecting a URL
            to an address. This URL can be anything: an IPFS address, a Giphy,
            or some JPEG hosted by a Romanian hacker.
            <br />
            <br />
            But just because the record is immutable doesn't mean the URL has to
            stay static. Why not allow the NFT owner to change where the URL
            points at any time?
            <br />
            <br />
            We're used to this paradigm with web2 profile pictures. On Twitter,
            it takes all of 10 seconds to upload a new pfp. If I want a new
            image for my NFT though, I have to go mint a new one.
            <br />
            <br />
            With MightyMorphs, you can own a dynamic NFT, pay gas fees once, and
            change the image URL any time you want. Just provide us the URL and
            sign the transaction with your wallet and the new image will appear
            across all major platforms shortly!
            <br />
            <br />
            As an example, check out the metadata from{" "}
            <a
              className={styles.uses}
              href={"https://twitter.com/rjkeck2/nft"}
              target="_blank"
              rel="noreferrer"
            >
              @rjkeck2
            </a>
            's Twitter pfp (or on{" "}
            <a
              className={styles.uses}
              href={
                "https://opensea.io/assets/0x1afe867c882d242c7fcd28887c4793ba3764d581/1"
              }
              target="_blank"
              rel="noreferrer"
            >
              Opensea
            </a>{" "}
            ). It can be dynamically changed any time and MightyMorphs handles
            all the updating!
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
