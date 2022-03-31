import Image from "next/image";
import styles from "../styles/Home.module.css";
import { connectWallet } from "../utils/eth_helpers";

export default function Header({ currentAccount, setCurrentAccount }) {
  return (
    <div className={styles.headerContainer}>
      <a href={"/"}>
        <Image
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
  );
}
