import styles from "../styles/Home.module.css";

const TWITTER_HANDLE = "mightymorphs";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <a
        className={styles.title}
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >{`@${TWITTER_HANDLE}`}</a>
    </div>
  );
}
