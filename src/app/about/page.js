"use client";
import styles from "../page.module.css";
import { useEffect, useState } from "react";

import { getMembers } from "@/apis/bo";

const AboutContainer = () => {
  //
  const [list, setList] = useState([]);

  const getDatas = async () => {
    const { success, data } = await getMembers();
    console.log(data.list);
    if (success) {
      setList(data.list);
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className={styles.content}>
      <button type="button" className={styles.btn}>
        뒤로가기
      </button>
      <section>
        <ul>
          {list.map((item, index) => (
            <li key={`member-row-${index}`}>
              <span>{item.userNm}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AboutContainer;
