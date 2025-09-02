import axios from "axios";
import Router from "next/router";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-api-token"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const handleLogout = async () => {
  try {
    // 로그아웃 api 호출
    //await userLogout();
    console.log("로그아웃");
  } catch (error) {
    // 로그아웃 api 실패 하더라도 다음 단계로 진행
    console.log("logout failed or token invalid");
  } finally {
    // 로그인 화면으로 이동
    Router.replace("/login");
  }
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (config) => {
    console.log(config);
    return config;
  },

  // 에러처리
  async (error) => {
    // console.log(error);
    const originalRequest = error.config;
    // 2025-01-13 토큰 만료 시 로그아웃 처리
    if (
      error.response?.status == 401 ||
      error.response?.data.code === "E00401"
    ) {
      console.log("axios error logout");
      await handleLogout();
      return;
    } else {
      // NOTICE: E0002 id/pw 입력 오류시 팝업표시 x
      // 전역 showAlert
      if (
        error.response?.data.code === "E00001" ||
        error.response?.data.code === "E00002"
      ) {
        return Promise.reject(error);
      }

      // showGlobalAlert({
      //   title: error.response?.data.message,
      //   confirmText: "OK",
      // });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
