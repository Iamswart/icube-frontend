
'use client';

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import axios from "axios";
import styles from "./social-auth.module.css";
import { useAuthStore } from "../store";

const SocialAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const { setUser, setAccessToken } = useAuthStore();

  const googleLoginHandler = useCallback(async (code: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/google?code=${code}`

      );
      setUser({ goggleFirstName: res.data.user.first_name });
      setAccessToken(res.data.access_token);
      return res.data;
    } catch (err) {
      setError((err as any).message);
      return null;
    }
  },[setUser, setAccessToken, setError]);

  const onGogglelogin = useCallback(async () => {
    const code = searchParams.get("code");
    if (code) {
      const response = await googleLoginHandler(code);
      if (response && response.access) {
        router.push("/");
      }
    }
  }, [googleLoginHandler, router, searchParams]);

  useEffect(() => {
    onGogglelogin();
  }, [onGogglelogin]);

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  return (
    <div className={styles["loading-icon-container"]}>
      <div className={styles["loading-icon"]}>
        <div className={`${styles["loading-icon__circle"]} ${styles["loading-icon__circle--first"]}`}></div>
        <div className={`${styles["loading-icon__circle"]} ${styles["loading-icon__circle--second"]}`}></div>
        <div className={`${styles["loading-icon__circle"]} ${styles["loading-icon__circle--third"]}`}></div>
        <div className={`${styles["loading-icon__circle"]} ${styles["loading-icon__circle--fourth"]}`}></div>
      </div>
      <small className="text-center mr-2">Just a moment</small>
    </div>
  );
};

export default SocialAuth;

