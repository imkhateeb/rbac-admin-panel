import { TextIndent, TextOutdent, ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";
import adminNavigations from "../utils/adminNavigations";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="w-full bg-white flex justify-between h-full items-center px-4">
      {!showSidebar ? (
        <div
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-all duration-200 md:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <TextIndent size={32} weight="fill" />
        </div>
      ) : (
        <div
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-all duration-200"
          onClick={() => setShowSidebar(false)}
        >
          <TextOutdent size={32} weight="fill" />
        </div>
      )}

      <Link
        to={"/"}
        className="flex w-full h-full items-center justify-center gap-2 max-md:hidden"
      >
        <ShieldCheck size={40} weight="fill" />
        <p className="text-lg font-semibold">
          Permisio - Administrator Dashboard.
        </p>
      </Link>

      <Link to={"/admin"} className="md:hidden">
        <ShieldCheck size={40} weight="fill" />
      </Link>

      {showSidebar && (
        <div className="p-2 bg-gray-200 rounded-3xl flex flex-col gap-2 w-[200px] fixed top-[11vh] left-1 border h-[87.5vh]">
          <p className="p-2 border-b font-semibold text-gray-500">Permisio</p>
          <div>
            {adminNavigations.map((nav) => {
              const isActive = location.pathname === nav.to;
              return (
                <Link
                  to={nav.to}
                  key={nav.title}
                  className={`p-2 flex items-center gap-2 rounded-lg ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setShowSidebar(false)}
                >
                  {isActive ? nav.activeIcon : nav.icon}
                  <span className={`${isActive ? "font-bold" : ""}`}>
                    {nav.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
