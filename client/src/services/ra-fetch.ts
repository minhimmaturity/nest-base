const raFetch = async (url: string, options: any = {}) => {
  const requestHeaders =
    options.headers || new Headers({ Accept: "application/json" });
  if (
    !requestHeaders.has("Content-Type") &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set("Authorization", options.user.token);
    requestHeaders.set("Access-Control-Expose-Headers", "Content-Range");
    requestHeaders.set("Content-Range", "bytes : 0-9/*");
  }
  const response = await fetch(url, { ...options, headers: requestHeaders });
  const text = await response.text();
  const o = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };
  let status = o.status,
    statusText = o.statusText,
    headers = o.headers,
    body = o.body;
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    // not json, no big deal
  }
  if (status < 200 || status >= 300) {
    return Promise.reject(JSON.parse(body));
  }
  return Promise.resolve({
    status: status,
    headers: headers,
    body: body,
    json: json,
  });
};

export default (url: string, options: any = {}) => {
  options.user = {
    authenticated: true,
    token: localStorage.getItem("token"),
  };
  return raFetch(url, options);
};
