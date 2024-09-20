import Logo from "@/components/Logo";
import Title from "@/components/Title";
import ProfileInfo from "./ContactContainer/ProfileInfo";
import NewDM from "./ContactContainer/NewDM";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/app-store";
import { setDirectMessagesContact } from "@/store/slices/chat-slice";
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
    try {
      getContacts();
    } catch (error) {
      console.log({ error });
    }
  }, []);
  return (
    <div className="lg:[w-[30vw] relative w-full border-r-2 border-[#2f303b] bg-[#1b1c24] md:w-[35vw] xl:w-[20vw]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="scrollbar-hidden max-h-[38vw] overflow-y-auto">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="scrollbar-hidden max-h-[38vw] overflow-y-auto">
          <ContactList contacts={channelList} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;
