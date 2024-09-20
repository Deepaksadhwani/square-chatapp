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
import moment from "moment";

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
    dispatch(setSelectedChatData(contact));
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch(setSelectedChatMessages([])); // Clear messages if switching to a different contact
    }
  };
  
  return (
    <div className="mt-5 space-y-2">
      {contacts.map((contact: any) => (
        <div
          key={contact._id}
          onClick={() => handleClick(contact)}
          className={`flex cursor-pointer items-center rounded-lg p-3 transition-all duration-300 ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              : "bg-[#2a2b33] hover:bg-[#3a3b43]"
          }`}
        >
          <div className="flex items-center gap-4">
          { !isChannel && <Avatar className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
              {contact.image ? (
                <AvatarImage
                  src={contact.image}
                  alt={`${contact.firstName} ${contact.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-lg uppercase ${getColor(
                    contact.color,
                  )}`}
                >
                  {contact.firstName ? contact.firstName[0] : contact.email[0]}
                </div>
              )}
            </Avatar>}
            {isChannel && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff22]">
                #
              </div>
            )}
            {
              <div className="flex-1 ">
                {!isChannel ? (
                  <div className="text-lg poppins-medium font-semibold text-white">
                    {contact.firstName && contact.lastName
                      ? `${contact.firstName} ${contact.lastName}`
                      : contact.email}
                  </div>
                ) : (
                  <div className="text-lg poppins-medium font-semibold text-white">
                    {contact.name}
                  </div>
                )}

               {!isChannel && <div className="text-sm text-gray-200">
                  {moment(contact.lastMessageTime).fromNow()}
                </div>}
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
