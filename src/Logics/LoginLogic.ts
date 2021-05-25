import React from "react";
import { kea } from "kea";
import axios from "axios";
import { Modal } from "antd";

const LoginLogic = kea({
  path: () => ["kea", "login"],

  defaults: {
    loginLoading: false,
  },

  actions: {
    login: ({ email, password }: any, callback: any) => ({
      email,
      password,
      callback,
    }),
    setUsername: ({ username }: any) => ({ username }),
    unsetLoading: true,
  },

  reducers: {
    loginLoading: {
      login: () => true,
      unsetLoading: () => false,
    },
    username: [
      "",
      {
        setUsername: (_: any, { username }: any) => username,
      },
    ],
  },

  listeners: ({ actions, props }) => ({
    login: async ({ email, password, callback }: any) => {
      try {
        const { data } = await axios.get(
          "https://run.mocky.io/v3/7870d357-170d-4631-8dc3-fa03e1a601b9"
        );
        if (
          email === "arqam.ali16@gmail.com" &&
          password === "Bubblesort@123"
        ) {
          await localStorage.setItem("token", data.accessToken);
          actions.setUsername(data);
          callback("/dashboard");
        } else {
          Modal.error({
            title: "Login Error",
            content: "Credential entered are invalid!",
          });
          actions.unsetLoading();
        }
      } catch (err) {
        Modal.error({
          title: "Login Error",
          content: "Credential entered are invalid!",
        });
      }
    },
  }),
});

export default LoginLogic;
