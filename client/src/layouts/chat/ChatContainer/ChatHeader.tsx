import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/app-store";
import { closeChat } from "@/store/slices/chat-slice";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedChatData = useSelector(
    (state: RootState) => state.chat?.selectedChatData,
  );
  const selectedChatType = useSelector(
    (state: RootState) => state.chat?.selectedChatType,
  );
  return (
    <div className="poppins-medium flex h-[11vh] items-center justify-between border-b-2 border-[#2f303b] px-5 text-xl font-medium">
      <div className="flex w-full items-center mt-2 justify-between gap-5">
        <div className="flex items-center justify-center gap-3">
          <div className="relative h-12 w-12">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={selectedChatData.image}
                    alt="profile"
                    className="h-full w-full bg-black object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-[1px] text-lg uppercase ${getColor(selectedChatData.color)}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName[0]
                      : selectedChatData.email[0]}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff22]">
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => dispatch(closeChat())}
            className="text-neutral-500 transition-all duration-300 focus:border-none focus:text-white focus:outline-none"
          >
            <RiCloseFill className="text-3xl hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
