import React, { useState } from "react";

const CardDirector = ({ director, index }) => {
  if (director == "undefined") return;

  const up = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
  const down = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full rounded-lg border flex flex-col p-5 basis-1/5  hover:shadow-md  cursor-pointer" onClick={() => {
      setShowMore(!showMore);
    }}>
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="poppins-bold text-sm">
            {director.name != "undefined" && director.name}
          </div>
          <div className="font-bold text-xs  text-slate-500">
            {director.officer != "undefined" && director.officer}
          </div>
        </div>
        <div>
          <div
            className="poppins-regular underline text-xs"
            
          >
            {showMore ? up : down}
          </div>
        </div>
      </div>
      <div className={` ${showMore ? "" : "hidden"} `}>
        <div className={`py-4 transition  delay-1000 ease-in-out`}>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Nationality</div>
            <div className="text-xs font-bold">
              {director.nationality != "undefined" && director.nationality}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Incorporator</div>
            <div className="text-xs font-bold">
              {director.incorporator != "undefined" && director.incorporator}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Board</div>
            <div className="text-xs font-bold">
              {director.board != "undefined" && director.board}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Gender</div>
            <div className="text-xs font-bold">
              {director.gender != "undefined" && director.gender}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Stockholder</div>
            <div className="text-xs font-bold">
              {director.stock_holder != "undefined" && director.stock_holder}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Executive Committee</div>
            <div className="text-xs font-bold">
              {director.executive_committe != "undefined" &&
                director.executive_committe}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs">Tax Identification Number</div>
            <div className="text-xs font-bold">
              {director.tax_id_number != "undefined" && director.tax_id_number}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDirector;
