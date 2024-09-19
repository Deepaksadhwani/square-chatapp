import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/MultipleSelector";

const CreateChannel = () => {
  const [openNewChannelModel, setNewChannelModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState<any>([]);
  const [channelName, setChannelName] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = async () => {
      const res = await apiClient.get("/contacts/get-all-contacts", {
        withCredentials: true,
      });

      setAllContacts(res.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {};
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setNewChannelModel(true)}
              className="cursor-pointer text-start text-sm font-light text-neutral-400 text-opacity-90 transition-all duration-300 hover:text-neutral-100"
            />
          </TooltipTrigger>
          <TooltipContent className="mb-2 border-none bg-[#1c1b1e] p-3 text-white">
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* // dialog component */}
      <Dialog open={openNewChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="flex h-[400px] w-[400px] flex-col border-none bg-[#181920] text-white">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for new channel.
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Channel Name"
              className="rounded-lg border-none bg-[#2c2e3b] p-6"
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg border-none bg-[#2c2e3b] py-2 text-white"
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              onChange={setSelectedContacts}
              value={selectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-400">
                  No results found.
                </p>
              }
            />
          </div>
          <button>
            <Button
              onClick={createChannel}
              className="w-full bg-purple-700 transition-all duration-300 hover:bg-purple-900"
            >
              Create Channel
            </Button>
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
