import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectNotes, updateNote } from "../redux/slice/NotesSlice";
import { useNavigate } from "react-router-dom";

// Editor component for creating and editing notes
const Editor = () => {
  const [value, setValue] = useState("");  // Note content
  const [heading, setHeading] = useState("");  // Note title
  const [color, setColor] = useState("");  // Note color

  const { id } = useParams();  // Extract note ID from URL parameters
  const notes = useSelector(selectNotes);  // Get notes from Redux store
  const dispatch = useDispatch();  // Dispatch function for Redux actions
  const [buttonLabel, setButtonLabel] = useState(false);  // Save button animation state
  const navigate = useNavigate();  // Navigation hook

  // Handle note update
  const handleUpdate = () => {
    if (heading && value) {
      dispatch(
        updateNote({
          id,
          title: heading,
          description: value,
          date: new Date().toDateString().slice(4),
          color: color,
        })
      );
    }
    setButtonLabel(true);
    setTimeout(() => setButtonLabel(false), 2000);
  };

  // Populate editor with existing note content
  useEffect(() => {
    if (notes.length > 0) {
      const isNoteExist = notes.find((note) => note.id === id);
      if (isNoteExist) {
        setHeading(isNoteExist.title);
        setValue(isNoteExist.description);
        setColor(isNoteExist.color);
      }
    }
  }, [id, notes]);

  return (
    <div className="p-5 h-screen w-screen">
      <div className="md:w-4/5 mx-auto flex flex-col gap-10 h-full">
        <div className="flex justify-between items-center">
          <div className="logo text-xl font-semibold">NoteIt.</div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 px-5 text-xs animate rounded-md text-black border border-black font-medium"
            >
              Back
            </button>
            <button
              onClick={handleUpdate}
              className="p-2 px-5 text-xs bg-black hover:bg-gray-800 animate rounded-md text-white"
            >
              {buttonLabel ? "Saved" : "Save"}
            </button>
          </div>
        </div>
        <div className="">
          <input
            type="text"
            className="outline-none text-xl w-full"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-5 h-full overflow-y-auto border rounded-md">
          <div className="editor h-full">
            <ReactQuill
              theme="snow"
              className=""
              value={value}
              onChange={setValue}
              placeholder="Notes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
