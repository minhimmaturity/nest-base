const authConfig = {
  jwtConstants: {
    secret: process.env.SECRET_KEY || "SuperSecret123!@#", // change it or set SECRET_KEY in .env
  },
};

export default authConfig;
