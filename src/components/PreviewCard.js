import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Component for displaying a preview of a note
const PreviewCard = ({ data, handleClose }) => {
  const { date, title, description } = data;

  return (
    <div className="bg-white rounded-lg flex flex-col gap-3 lg:w-[700px] md:w-[500px] w-full p-5 md:h-[700px] h-full overflow-y-scroll">
      {/* Header with title and close button */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium ">{title}</div>
        <XMarkIcon
          onClick={() => handleClose(false)}
          className="w-4 text-gray-500 hover:text-red-500 animate cursor-pointer"
        />
      </div>

      {/* Note content with HTML rendering */}
      <p className="text-sm" dangerouslySetInnerHTML={{ __html: description }} />

      {/* Footer with date */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500"> {date}</span>
      </div>
    </div>
  );
};

export default PreviewCard;
