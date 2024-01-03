import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-72">
        <h3 className="text-lg font-medium text-center">SkillStreet Assessment</h3>
        <div className="flex gap-2 items-center mt-2">
          <Link to="/dashboard" className="block flex-1">
            <div className="cursor-pointer transition duration-300 flex-1 py-2 px-5 text-xs font-medium bg-black hover:bg-gray-800 text-white rounded flex gap-1 items-center justify-center">
              Demo
            </div>
          </Link>

          <a
            href="https://github.com/03brainy-clicks/skillstreet/"
            target="_black"
            className="w-full block flex-1"
          >
            <div className="w-full transition duration-300 cursor-pointer flex-1 py-2 px-5 text-xs font-medium border border-black text-black  rounded flex gap-1 items-center justify-center">
              Repo
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
