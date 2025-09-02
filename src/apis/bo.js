import api from "@/lib/axios.js";

export const login = async (data) => {
  try {
    const res = await api.post("/v1/users/login", data);
    if (res.data && res.data.resultCodeNo === 2000) {
      return { success: true, data: res.data.resultData };
    } else {
      return { success: false, data: res.data.resultMsg };
    }
  } catch (err) {
    console.error(err);
  }
};

export const getMembers = async (params) => {
  try {
    const res = await api.get("/v1/admin/users", { params });
    if (res.data && res.data.resultCodeNo === 2000) {
      return { success: true, data: res.data.resultData };
    } else {
      return { success: false, data: res.data.resultMsg };
    }
  } catch (err) {
    console.log(err);
  }
};
