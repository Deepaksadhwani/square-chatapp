import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColor } from "@/lib/utils";
import { RootState } from "@/store/app-store";
import { FiEdit2 } from "react-icons/fi";
import {  IoPowerSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const userData = useSelector((state: RootState) => state.user?.userData);
  const navigate = useNavigate();

const logout = async () => {
    
  }
  return (
    <div className="absolute bottom-0 flex h-16 w-full items-center  justify-between bg-[#2a2b33] px-5">
      <div className="flex items-center justify-center gap-3">
        <div className="relative h-12 w-12">
          <Avatar className="h-12 w-12 overflow-hidden rounded-full">
            {userData.image ? (
              <AvatarImage
                src={userData.image}
                alt="profile"
                className="h-full w-full bg-black object-cover"
              />
            ) : (
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-[1px] text-lg uppercase ${getColor(userData.color)}`}
              >
                {userData.firstName ? userData.firstName[0] : userData.email[0]}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userData.firstName && userData.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2 onClick={()=> navigate("/profile")} className="text-xl font-medium text-purple-500" />
            </TooltipTrigger>
            <TooltipContent className="border-none bg-[#1c1b1e] text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp onClick={logout} className="text-xl font-medium text-purple-500" />
            </TooltipTrigger>
            <TooltipContent className="border-none bg-[#1c1b1e] text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
