import React from "react";

const SectionTitle = ({ heading }) => {
  return (
    <div>
      <h1 className="mt-16 font-semibold text-xl md:text-3xl text-center w-48 md:w-64 mx-auto border-b-2 border-[#09a7cd]">
        {heading}
      </h1>
    </div>
  );
};

export default SectionTitle;
