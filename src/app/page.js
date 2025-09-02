"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { login } from "@/apis/bo";

export default function Home() {
  //
  const router = useRouter();

  const onSave = async () => {
    let params = {};
    params.lgnId = process.env.NEXT_PUBLIC_USER_ID;
    params.lgnPswd = process.env.NEXT_PUBLIC_USER_PW;

    const { success, data } = await login(params);

    if (success) {
      //
      localStorage.setItem("token", data.token);
      localStorage.setItem("refToken", data.refToken);

      setTimeout(() => {
        router.push("/about");
      }, 100);
    } else {
      alert(data);
    }
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={onSave}>
        토큰 저장하기
      </button>
    </div>
  );
}
