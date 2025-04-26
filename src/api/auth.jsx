// src/api/auth.js
import client from "./client";

const login = async (cin, password) => {
  try {
    const response = await client.post("/auth", { cin, password });
    return {
      ok: true,
      data: response.data, // Contient { data: { token, user } }
    };
  } catch (error) {
    return {
      ok: false,
      data: error.response?.data || null,
    };
  }
};

export default {
  login,
};