import chatApi from "~/utils/chatApi";
import store from "../store";
import { default as EventEmitter } from "../event/eventEmitter";
import { setUserIsLoggedIn } from "../UserIsLoggedIn ";
import { upsertUser } from "../Participants";

class AutoLoginService {
  constructor() {
    EventEmitter.subscribe("onConnect", () => {
      const token = localStorage.getItem("sessionId");
      if (!token || token === "undefined") {
        return;
      }
      this.userLogin(token);
    });
  }

  async userLogin(token) {

    const handleLoginFailure = () => {
      localStorage.removeItem("sessionId");
      console.log("Login Failure")
      store.dispatch(setUserIsLoggedIn(false));
    };

    try {
      const { token: userToken, user: userData } = await chatApi.userLogin({
        token,
      });

      if (userToken && userToken !== "undefined") {
        localStorage.setItem("sessionId", userToken);
        store.dispatch(upsertUser(userData));
        store.dispatch(setUserIsLoggedIn(true));
      } else {
        handleLoginFailure();
        console.log("Invalid session token.", "warning");
      }
    } catch (error) {
      handleLoginFailure();
      console.log(error.message, "warning");
    }
  }
}

const autoLoginService = new AutoLoginService();

export default autoLoginService;
