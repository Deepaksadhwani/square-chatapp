import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/app-store";
import {
  setSelectedChatData,
  setSelectedChatType,
} from "@/store/slices/chat-slice";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  async function searchContact(searchTerm: any) {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          "/contacts/search",
          { searchTerm },
          { withCredentials: true },
        );
        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts);
        } else {
          setSearchedContacts([]);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  }

  const selectNewContact = (contact: any) => {
    setOpenNewContactModal(false);
    dispatch(setSelectedChatType("contact"));
    dispatch(setSelectedChatData(contact));
    setSearchedContacts([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setOpenNewContactModal(true)}
              className="cursor-pointer text-start text-sm font-light text-neutral-400 text-opacity-90 transition-all duration-300 hover:text-neutral-100"
            />
          </TooltipTrigger>
          <TooltipContent className="mb-2 border-none bg-[#1c1b1e] p-3 text-white">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* // dialog component */}
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="flex h-[400px] w-[400px] flex-col border-none bg-[#181920] text-white">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              onChange={(e) => searchContact(e.target.value)}
              placeholder="Search Contact"
              className="rounded-lg border-none bg-[#2c2e3b] p-6"
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact: any) => (
                  <div
                    onClick={() => selectNewContact(contact)}
                    className="flex cursor-pointer items-center gap-3"
                    key={contact._id}
                  >
                    <div className="relative h-12 w-12">
                      <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                        {contact.image ? (
                          <AvatarImage
                            src={contact.image}
                            alt="profile"
                            className="h-full w-full rounded-full bg-black object-cover"
                          />
                        ) : (
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full border-[1px] text-lg uppercase ${getColor(contact.color)}`}
                          >
                            {contact.firstName
                              ? contact.firstName[0]
                              : contact.email[0]}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : ""}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContacts.length > 0 ? null : (
            <div className="mt-5 flex-1 flex-col items-center justify-center transition-all duration-1000 md:mt-0 md:flex md:bg-[#181920]">
              <Lottie
                options={animationDefaultOptions}
                isClickToPauseDisabled={true}
                height={100}
                width={100}
              />
              <div className="mt-5 flex flex-col items-center gap-5 text-xl text-opacity-80 transition-all duration-300 lg:text-2xl">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span> Search new
                  <span className="text-purple-500"> Contact.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
