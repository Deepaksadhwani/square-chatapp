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
import { animationDefaultOptions } from "@/lib/utils";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  async function searchContact(searchTerm: any) {}
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
          {searchedContacts.length > 0 ? null : (
            <div className="flex-1 flex-col  items-center justify-center transition-all duration-1000 md:flex md:bg-[#181920]">
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
