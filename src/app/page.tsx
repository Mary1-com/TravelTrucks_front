import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>

        <p className={styles.description}>
          You can find everything you want in our catalog
        </p>

        <Link className={styles.catalogLink} href="/catalog">
          View Now
        </Link>
      </div>
    </main>
  );
}