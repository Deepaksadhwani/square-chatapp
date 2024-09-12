import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { colors, getColor } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/app-store";
import { setUserData } from "@/store/slices/user-slice";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user?.userData);
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [image, setImage] = useState(null);
  const [selectColor, setSelectColor] = useState(userData.color || 0);
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is Required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required.");
      return false;
    }
    return true;
  };
  const saveChangesHandler = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClient.post(
          "user/update-profile",
          { firstName, lastName, color: selectColor },
          { withCredentials: true },
        );
        console.log(res);
        if (res.status === 200) {
          dispatch(setUserData(res.data.data));
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-[#1b1c24]">
      <div className="flex w-[80vw] flex-col gap-10 md:w-max">
        <div>
          <IoArrowBack className="cursor-pointer text-4xl text-white/90 lg:text-6xl" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="item-center relative flex h-full w-32 justify-center md:w-48"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar className="h-32 w-32 overflow-hidden rounded-full md:h-48 md:w-48">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="h-full w-full bg-black object-cover"
                />
              ) : (
                <div
                  className={`flex h-32 w-32 items-center justify-center rounded-full border-[1px] text-5xl uppercase md:h-48 md:w-48 ${getColor(selectColor)}`}
                >
                  {firstName
                    ? firstName[0]
                    :  userData.email[0]}
                </div>
              )}
            </Avatar>
            {hover && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 ring-fuchsia-50">
                {image ? (
                  <FaTrash className="cursor-pointer text-3xl text-white" />
                ) : (
                  <FaPlus className="cursor-pointer text-3xl text-white" />
                )}
              </div>
            )}
            {/* <input type="text" /> */}
          </div>
          <div className="flex min-w-32 flex-col items-center justify-center gap-5 text-white md:min-w-64">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userData.email}
                className="rounded-lg border-none bg-[#2c2e3b] p-6"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg border-none bg-[#2c2e3b] p-6"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Second Name"
                type="email"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg border-none bg-[#2c2e3b] p-6"
              />
            </div>
            <div className="flex w-full gap-5">
              {colors &&
                colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectColor(index)}
                    className={`${color} h-8 w-8 cursor-pointer rounded-full transition-all duration-300 ${
                      selectColor === index
                        ? "outline outline-2 outline-white/80"
                        : ""
                    }`}
                  ></div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 duration-300 hover:bg-purple-900"
            onClick={saveChangesHandler}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
