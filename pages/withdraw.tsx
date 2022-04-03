import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { checkIfWalletIsConnected, withdraw } from "../utils/ethHelpers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Withdraw() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);

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
          <div
            className={
              currentAccount === ""
                ? styles.buttonInactive
                : isWithdrawing || success
                ? styles.buttonInactive
                : styles.buttonActive
            }
            onClick={
              currentAccount === ""
                ? () => {}
                : isWithdrawing || success
                ? () => {}
                : () => withdraw(setIsWithdrawing, setSuccess)
            }
          >
            {currentAccount === ""
              ? "Connect wallet to withdraw"
              : isWithdrawing
              ? "Withdrawing, please wait..."
              : success
              ? "Withdrawal complete!"
              : "Withdraw"}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
