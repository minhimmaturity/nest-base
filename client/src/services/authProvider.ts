import { LoginParams } from "../type";
import { loginRequest } from "./api";

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";

export default (type: string, params: any) => {
  if (type === AUTH_LOGIN) {
    return loginRequest(params).then((res) => {
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      return;
    });
  }
  if (type === AUTH_LOGOUT) {
    // ...
  }
  if (type === AUTH_ERROR) {
    // ...
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  return Promise.reject("Unknown method");
};
