import { FC } from "react";

interface PropsType {
  text: string;
}

const Title: FC<PropsType> = ({ text }) => {
  return (
    <h6 className="pl-10 text-sm font-light uppercase tracking-widest text-neutral-400 text-opacity-90">
    
      {text}
    </h6>
  );
};

export default Title;
