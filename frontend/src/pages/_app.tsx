import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { Theme } from '@radix-ui/themes';
import Navbar from "~/components/Navbar";
import '@radix-ui/themes/styles.css';
import { Montserrat } from 'next/font/google'
import "~/styles/globals.css";  
import Project from "~/components/project/Project";

const mont = Montserrat({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Theme>
        <Component {...pageProps}/>
      </Theme>
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
