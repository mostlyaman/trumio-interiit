import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';


import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Theme>
        <Component {...pageProps} />;
      </Theme>
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
