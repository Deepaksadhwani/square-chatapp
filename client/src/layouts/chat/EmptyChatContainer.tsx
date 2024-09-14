import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  return (
    <div className="hidden flex-1 flex-col items-center justify-center transition-all duration-1000 md:flex md:bg-[#1c1d25]">
      <Lottie
        options={animationDefaultOptions}
        isClickToPauseDisabled={true}
        height={200}
        width={200}
      />
      <div className="mt-10 flex flex-col items-center gap-5 text-3xl text-opacity-80 transition-all duration-300 lg:text-4xl">
        <h3 className="poppins-medium">
          Hi<span className="text-purple-500">!</span> Welcome to <span className="text-purple-500">Square</span> Chat App<span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
