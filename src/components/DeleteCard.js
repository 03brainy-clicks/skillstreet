import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteNote } from "../redux/slice/NotesSlice";
import { useDispatch } from "react-redux";

// Component for confirming and deleting a note
const DeleteCard = ({ handleClose, id }) => {
  const dispatch = useDispatch();

  // Handle note deletion
  const handleDelete = () => {
    dispatch(deleteNote(id));
  };

  return (
    <div className="sm:w-96 flex flex-col gap-5 bg-white p-5 rounded-md w-11/12">
      {/* Close button */}
      <div className="flex justify-end items-center">
        <XMarkIcon
          onClick={() => handleClose(false)}
          className="w-4 text-gray-500 hover:text-red-500 animate cursor-pointer"
        />
      </div>

      {/* Delete confirmation content */}
      <div>
        <p className="font-medium text-sm">
          Are you sure you want to delete this note?
        </p>
        <p className="text-xs text-gray-500">
          You will not be able to recover it afterwards.
        </p>
      </div>

      {/* Cancel and Delete buttons */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => handleClose(false)}
          className="p-2 px-5 text-xs animate rounded-md text-black border border-black font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="p-2 px-5 text-xs bg-black hover:bg-gray-800 animate rounded-md text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCard;
