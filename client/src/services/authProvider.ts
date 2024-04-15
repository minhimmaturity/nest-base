import getPayloadDataToken from "../helper/getPayloadDataToken";

const authProvider = {
  login: ({ token }: { token: string }) => {
    if (!token) {
      return Promise.reject();
    }
    localStorage.setItem("token", token);
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  checkError: (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () => {
    const data = getPayloadDataToken();
    const { id, name } = data;
    return Promise.resolve({
      id,
      fullName: name,
    });
  },
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
