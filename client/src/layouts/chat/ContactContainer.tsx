import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/app-store";
import {
  setChannel,
  setDirectMessagesContact,
} from "@/store/slices/chat-slice";
import { apiClient } from "@/lib/api-client";
import Logo from "@/components/Logo";
import Title from "@/components/Title";
import ProfileInfo from "./ContactContainer/ProfileInfo";
import NewDM from "./ContactContainer/NewDM";
import ContactList from "@/components/ContactList";
import CreateChannel from "./ContactContainer/CreateChannel";

const ContactContainer = () => {
  const directMessagesContacts = useSelector(
    (state: RootState) => state.chat.directMessagesContacts,
  );
  const channelList = useSelector((state: RootState) => state.chat.channels);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get("/contacts/get-contacts-for-dm", {
        withCredentials: true,
      });
      if (res.data.contacts) {
        dispatch(setDirectMessagesContact(res.data.contacts));
      }
    };
    const getChannels = async () => {
      const res = await apiClient.get("/channels/get-channels", {
        withCredentials: true,
      });
      if (res.data.channels) {
        dispatch(setChannel(res.data.channels));
      }
    };
    try {
      getContacts();
      getChannels();
    } catch (error) {
      console.log({ error });
    }
  }, [dispatch]);

  return (
    <div className="relative flex h-screen w-full flex-col border-r-2 border-[#2f303b] bg-[#1b1c24] md:w-[35vw] lg:w-[30vw] xl:w-[20vw]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="h-1/2 overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <Title text="Direct Messages" />
            <NewDM />
          </div>
          <div className="scrollbar-hidden h-[calc(100%-4rem)] overflow-y-auto">
            <ContactList contacts={directMessagesContacts} />
          </div>
        </div>
        <div className="h-1/2 overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <Title text="Channels" />
            <CreateChannel />
          </div>
          <div className="scrollbar-hidden h-[calc(100%-4rem)] overflow-y-auto">
            <ContactList contacts={channelList} isChannel={true} />
          </div>
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;
