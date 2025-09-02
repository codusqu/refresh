import styles from "./page.module.css";

import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/about" className={styles.btn}>
        토큰 저장하기
      </Link>
    </div>
  );
}
