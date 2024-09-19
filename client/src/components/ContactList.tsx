import { AppDispatch, RootState } from "@/store/app-store";
import {
  setSelectedChatData,
  setSelectedChatMessages,
  setSelectedChatType,
} from "@/store/slices/chat-slice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "./ui/avatar";
import { getColor } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";

const ContactList = ({
  contacts,
  isChannel = false,
}: {
  contacts: any;
  isChannel?: boolean;
}) => {
  const selectedChatData = useSelector(
    (state: RootState) => state.chat.selectedChatData,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (contact: any) => {
    if (isChannel) dispatch(setSelectedChatType("channel"));
    else dispatch(setSelectedChatType("contact"));
    console.log(contact);
    dispatch(setSelectedChatData(contact));
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch(setSelectedChatMessages([])); // if current contact is open and we switch to previous contact we need to clear those message
    }
  };
  return (
    <div className="mt-5">
      {contacts.map((contact: any) => (
        <div
          key={contact._id}
          onClick={() => handleClick(contact)}
          className={`cursor-pointer py-2 pl-10 transition-all duration-300 ${selectedChatData && selectedChatData._id === contact._id ? "bg-[#8417ff] hover:bg-[#8417ff]" : "hover:bg-[#f1f1f111]"}`}
        >
          <div className="flex items-center justify-start gap-5 text-neutral-300">
            {!isChannel && (
              <div className="flex items-center gap-2">
           
                <Avatar className="h-10 w-10 overflow-hidden rounded-full">
                  {contact.image ? (
                    <AvatarImage
                      src={contact.image}
                      alt="profile"
                      className="h-full w-full bg-black object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-[1px] text-lg uppercase ${getColor(contact.color)}`}
                    >
                      {contact.firstName
                        ? contact.firstName[0]
                        : contact.email[0]}
                    </div>
                  )}
                </Avatar>
                {contact.firstName && contact.lastName
                  ? `${contact.firstName} ${contact.lastName}`
                  : ""}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
