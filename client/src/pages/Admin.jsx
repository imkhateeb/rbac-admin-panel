import { Link, Route, Routes, useLocation } from "react-router-dom";
import Users from "./Users";
import Profile from "./Profile";
import Roles from "./Roles";
import Permissions from "./Permissions";
import adminNavigations from "../utils/adminNavigations";

const Admin = () => {
  const location = useLocation();

  return (
    <div className="w-full rounded-3xl flex gap-4 h-full">
      <div className="xl:w-[15vw] max-xl:w-[25vw] max-md:hidden">
        <div className="h-full p-2 bg-gray-200 rounded-3xl flex flex-col gap-2">
          <p className="p-2 border-b font-semibold text-gray-500">Permisio</p>
          <div>
            {adminNavigations.map((nav) => {
              const isActive = location.pathname === nav.to; // Dynamically check if the current path matches
              return (
                <Link
                  to={nav.to}
                  key={nav.title}
                  className={`p-2 flex items-center gap-2 rounded-lg ${
                    isActive ? "bg-gray-300 font-bold" : "hover:bg-gray-100"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive ? nav.activeIcon : nav.icon}
                  <span>{nav.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-4 rounded-3xl bg-white max-md:w-full xl:w-[85vw] max-xl:w-[75vw] h-[87vh]">
        <Routes>
          <Route path="" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
