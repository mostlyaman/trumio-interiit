/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect, useRef, useMemo } from "react";
import { useUserStore } from "~/store/UserStore";
import chatApi from "~/utils/chatApi";
import Loading from "../Loading"
import { useDispatch, useSelector } from 'react-redux'
import { getIsMobileView } from "~/store/chat/IsMobileView";
import { updateNetworkState } from "~/store/chat/NetworkState";
import { setSelectedConversation } from "~/store/chat/SelectedConversation";
import { setUserIsLoggedIn } from "~/store/chat/UserIsLoggedIn ";
import { upsertUser } from "~/store/chat/Participants";

import activityService from "~/store/chat/services/activityService";
import autoLoginService from "~/store/chat/services/autoLoginService";
import messagesService from "~/store/chat/services/messagesService";
import conversationService from "~/store/chat/services/conversationsService";


export default function ChatWrapper({ children }) {
  const { user } = useUserStore()
  const dispatch = useDispatch()
  const [chatLoggedIn, setChatLoggedIn] = useState<boolean>(false)

  const isMobileView = useSelector(getIsMobileView);
  const isMobileViewRef = useRef(isMobileView);
  useEffect(() => {
    isMobileViewRef.current = isMobileView;
  }, [isMobileView]);

  useEffect(() => {
    window.addEventListener("offline", () =>
      dispatch(updateNetworkState(false))
    );
    window.addEventListener("online", () => dispatch(updateNetworkState(true)));
    window.addEventListener("resize", () => {
      const isMobileView =
        window.innerWidth <= globalConstants.windowChangeWitdh;
      if (isMobileView !== isMobileViewRef.current) {
        dispatch(setIsMobileView(isMobileView));
      }
    });
    dispatch(
      setIsMobileView(window.innerWidth <= globalConstants.windowChangeWitdh)
    );

    
  })

  const sign_in = async () => {
    await chatApi.userCreate({ ulogin: user.id, pass: user.messaging_password })
    const { token: userToken, user: userData } = await api.userLogin(data);
    localStorage.setItem("sessionId", userToken);
    // subscribeForNotifications();
    dispatch(setSelectedConversation({}));
    dispatch(setUserIsLoggedIn(true));
    dispatch(upsertUser(userData));
    setChatLoggedIn(true)
  }
  
  useEffect(() => {
    const token = localStorage.getItem("sessionId");
    if (token && token !== "undefined") {
      setChatLoggedIn(true)
    } else {
      localStorage.removeItem("sessionId")
      try {
        if(user) {
          sign_in().catch((err) => console.error(err))
        } else {
          localStorage.removeItem("sessionId")
        }
      } catch (error) {
        alert(error.message)
        console.error(error)
      } 
    }

  }, [user, dispatch, setChatLoggedIn])
  
  return (
    <>
      {
        chatLoggedIn ? 
        {children} : 
        <div className="h-full w-full flex justify-center items-center z-1 bg-slate-400 bg-opacity-60 absolute left-0 top-0">
          <Loading className="stroke-sky-500 scale-[200%]" />
        </div>
      }
    </>
  )
}

