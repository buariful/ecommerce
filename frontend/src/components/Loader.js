import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="h-24 w-24 border-b-4 border-[#e70d82] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
