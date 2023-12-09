import { default as api } from "~/utils/chatApi";
import store from "../store";
import { insertChats } from "../Conversations";
import { upsertUsers } from "../Participants";

class ConversationsService {
  userIsLoggedIn = false;

  constructor() {
    store.subscribe(() => {
      let previousValue = this.userIsLoggedIn;
      this.userIsLoggedIn = store.getState().userIsLoggedIn.value;

      if (this.userIsLoggedIn && !previousValue) {
        this.syncData();
      }
    });
  }

  async syncData() {
    api.conversationList({}).then((chats) => {
      store.dispatch(insertChats(chats));
      chats.length &&
        api
          .getParticipantsByCids({ cids: chats.map((el) => el._id) })
          .then((users) => store.dispatch(upsertUsers(users)));
    });
  }
}

const conversationService = new ConversationsService();

export default conversationService;