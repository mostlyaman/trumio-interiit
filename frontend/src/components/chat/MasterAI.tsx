import { useAuth } from "@clerk/nextjs";
import { Montserrat } from 'next/font/google'
import ChatIcon from "../icons/ChatIcon";
import PersonIcon from "../icons/PersonaIcon";
import SubtractIcon from "../icons/SubtractIcon";
import StarIcon from "../icons/StarIcon";
const mont = Montserrat({ subsets: ['latin'] })

export default function Navbar() {

  return (
    <>
    <div>
        <div>
            <span>
                <ChatIcon/>
            </span>
            <div>
                <span>Master AI</span>
                <span>Project 1</span>
            </div>
        </div>
    </div>
    </>
  );
}
