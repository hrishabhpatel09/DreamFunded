import React from "react";
import profile from "../assets/images.png";

const RecievedBox = ({ message, time, img, sender}) => {
  const date = new Date(time);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const localTime = date.toLocaleTimeString(undefined, options);
  return (
    <span className="flex justify-start my-1 pr-1 pl-1 w-auto">
      <div className="h-4 w-4 rounded-full bg-red-400 mr-1 flex-shrink-0 overflow-hidden">
        <img src={profile} alt="user_img"/>
      </div>
      <span className="items-end bg-grey-700 bg-[#1f1f1f] text-gray-300 h-auto min-h-8 rounded-xl px-2 text-left rounded-tl-none">
        <span className="leading text-yellow-600 text-[13px]">{sender}</span>
        <br className="" />
        {message}
        <sub className="text-[10px] pl-1">{localTime}</sub>
      </span>
    </span>
  );
};

export default RecievedBox;
