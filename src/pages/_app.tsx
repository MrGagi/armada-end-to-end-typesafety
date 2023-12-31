import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "../styles/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
