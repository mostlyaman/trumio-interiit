import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { Theme } from '@radix-ui/themes';
import Navbar from "~/components/Navbar";
import '@radix-ui/themes/styles.css';
import { Montserrat } from 'next/font/google'
import "~/styles/globals.css";
import Chat from "../components/chat/Chat";
import Project from "~/components/project/Project";
import Team from "~/components/team/Team";

const mont = Montserrat({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Theme>
        <Navbar />
        {/* <Component className = {mont.className} {...pageProps} />; */}
        {/* <Project/> */}
        {/* <Team/> */}
        <Chat/>
      </Theme>
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
