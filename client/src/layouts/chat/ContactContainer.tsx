import Logo from "@/components/Logo";
import Title from "@/components/Title";

const ContactContainer = () => {
  return (
    <div className="lg:[w-[30vw] relative w-full border-r-2 border-[#2f303b] bg-[#1b1c24] md:w-[35vw] xl:w-[20vw]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
