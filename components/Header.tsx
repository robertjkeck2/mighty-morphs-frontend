import Image from "next/image";
import styles from "../styles/Home.module.css";
import { connectWallet } from "../utils/ethHelpers";

export default function Header({ currentAccount, setCurrentAccount }) {
  return (
    <div className={styles.headerContainer}>
      <a className={styles.logo} href={"/"}>
        <Image
          src="/mightymorphs.png"
          alt="mightymorphs"
          height="50px"
          width="50px"
        />
      </a>
      <a className={styles.headerLink} href={"/morph"}>
        Morph
      </a>
      <a className={styles.headerLink} href={"/"}>
        Mint
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
