import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../utils/Modal";
import DeleteCard from "./DeleteCard";
import { useNavigate } from "react-router-dom";
import PreviewCard from "./PreviewCard";

// Component for displaying individual note cards
const NoteCard = ({ data }) => {
  const { date, title, description, id, color } = data;
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [previewToggle, setPreviewToggle] = useState(false);
  const navigate = useNavigate();

  // Determine background color based on note color
  const cardColor = (color) => {
    switch (color) {
      case "yellow":
        return "bg-yellow-300";
      case "orange":
        return "bg-orange-300";
      case "purple":
        return "bg-purple-300";
      case "green":
        return "bg-green-300";
      case "blue":
        return "bg-blue-300";
      default:
        return "";
    }
  };

  return (
    <div className={`p-5 rounded-lg flex flex-col gap-3 h-56 ${cardColor(color)}`}>
      {/* Header with title and preview button */}
      <div className="flex justify-between items-center">
        <span onClick={() => setPreviewToggle(!previewToggle)} className="font-medium cursor-pointer">{title}</span>
        <Modal isOpen={previewToggle} onClose={() => setPreviewToggle(false)}>
          <PreviewCard handleClose={() => setPreviewToggle(false)} data={data} />
        </Modal>
        {/* Delete button with modal */}
        <TrashIcon
          onClick={() => setDeleteToggle(!deleteToggle)}
          className="w-4 hover:text-red-500 animate cursor-pointer"
        />
        <Modal isOpen={deleteToggle} onClose={() => setDeleteToggle(false)}>
          <DeleteCard handleClose={() => setDeleteToggle(false)} id={id} />
        </Modal>
      </div>

      {/* Note content with HTML rendering */}
      <p className="text-sm line-clamp-4" dangerouslySetInnerHTML={{ __html: description }} />

      {/* Footer with date and edit button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs">{date}</span>
        {/* Edit button */}
        <div
          onClick={() => navigate(`/editor/${id}`)}
          className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 animate text-white flex items-center justify-center cursor-pointer"
        >
          <PencilIcon className="w-4" />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
