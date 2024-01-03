import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { selectNotes, addNote } from "../redux/slice/NotesSlice";

const Dashboard = () => {
  const [addToggle, setAddToggle] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const notes = useSelector(selectNotes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter notes based on filter and searchQuery
  const handleFilter = () => {
    let filteredNotes = notes;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query) ||
          note.color.toLowerCase().includes(query)
      );
    }

    switch (filter) {
      case "All":
        break;
      case "Color":
        filteredNotes = filteredNotes.filter((note) =>
          note.color.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case "Heading":
        filteredNotes = filteredNotes.filter((note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case "Content":
        filteredNotes = filteredNotes.filter((note) =>
          note.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      default:
        break;
    }

    return filteredNotes;
  };

  // Add a new note with a specified color
  const handleAddNote = async (color) => {
    const uid = uuidv4();
    dispatch(
      addNote({
        title: "Notes",
        description: "Write notes",
        id: uid,
        date: new Date().toDateString().slice(4),
        color: color,
      })
    );
    navigate(`/editor/${uid}`);
  };

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col">
      {/* Sidebar section */}
      <div className="w-28 h-full border-r md:flex items-center flex-col gap-11 py-5 hidden">
        <div className="logo text-xl font-semibold">NoteIt.</div>
        <div
          onClick={() => setAddToggle(!addToggle)}
          className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 animate text-white flex items-center justify-center cursor-pointer"
        >
          <PlusIcon className="w-5" />
        </div>
        {addToggle && (
          <div className="flex flex-col justify-center gap-5">
            {/* Color options for new note */}
            <div
              className="bg-yellow-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("yellow")}
            ></div>{" "}
            <div
              className="bg-orange-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("orange")}
            ></div>
            <div
              className="bg-purple-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("purple")}
            ></div>
            <div
              className="bg-blue-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("blue")}
            ></div>
            <div
              className="bg-green-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("green")}
            ></div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div className="w-full border-r items-center justify-between flex p-5 gap-2 md:hidden">
        <div className="logo text-xl font-semibold">NoteIt.</div>

        {addToggle && (
          <div className="flex justify-center gap-2 ml-auto">
            <div
              className="bg-yellow-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("yellow")}
            ></div>{" "}
            <div
              className="bg-orange-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("orange")}
            ></div>
            <div
              className="bg-purple-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("purple")}
            ></div>
            <div
              className="bg-blue-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("blue")}
            ></div>
            <div
              className="bg-green-300 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => handleAddNote("green")}
            ></div>
          </div>
        )}
        <div
          onClick={() => setAddToggle(!addToggle)}
          className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 animate text-white flex items-center justify-center cursor-pointer"
        >
          <PlusIcon className="w-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full p-5 md:px-16 flex flex-co gap-9 flex-col trigger">
        <div>
          <div className="flex items-center gap-2 md:justify-end justify-center ">
            {/* Filter dropdown */}
            <select
              name="filter"
              value={filter}
              className="outline-none text-sm p-2 rounded-md bg-white"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Color">Color</option>
              <option value="Heading">Heading</option>
              <option value="Content">Content</option>
            </select>
            
            {/* Search input */}
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-md text-xs focus:border-black animate outline-none placeholder:text-gray-400 w-56 group border"
            />

            {/* Search button */}
            <button
              onClick={() => handleFilter()}
              className="p-2 px-5 text-xs bg-black hover:bg-gray-800 animate rounded-md text-white"
            >
              Search
            </button>
          </div>
        </div>
        {/* Section title */}
        <div className="text-4xl font-medium">Notes</div>
        {/* Notes grid */}
        <div className="h-full overflow-y-auto rounded-md">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
            {handleFilter().map((note) => (
              <NoteCard data={note} key={note.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
