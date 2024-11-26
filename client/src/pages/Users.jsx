import { useState, useRef, useEffect } from "react";
import { Switch } from "antd";
import {
  DotsThreeVertical,
  Eye,
  Funnel,
  PlusCircle,
  XCircle,
} from "@phosphor-icons/react";
import AddUser from "../components/AddUser";
import UserRolesModal from "../components/UserRolesModal";
import UserPermissionsModal from "../components/UserPermissionsModal.jsx";
import EditUserModal from "../components/EditUserModal.jsx";
import DeleteUserModal from "../components/DeleteUserModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  isDeleteUserPermission,
  isEditUserPermission,
} from "../utils/hasPermission.js";
import { errorToast } from "../utils/toasts.js";
import { updateUser } from "../redux/reducers/usersReducers.js";

const tableCol = [
  { title: "Name", width: "250px", isSort: true, isCenter: false },
  { title: "Email", width: "300px", isSort: true, isCenter: false },
  { title: "Phone", width: "150px", isSort: false, isCenter: false },
  { title: "Role(s)", width: "100px", isSort: false, isCenter: true },
  {
    title: "Custom Permission(s)",
    width: "200px",
    isSort: false,
    isCenter: true,
  },
  { title: "Blocked", width: "150px", isSort: false, isCenter: true },
  { title: "Status", width: "150px", isSort: false, isCenter: true },
  { title: "Actions", width: "100px", isSort: false, isCenter: true },
];

const Users = () => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [showRoles, setShowRoles] = useState(null);
  const [showPermissions, setShowPermissions] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const actionsRef = useRef(null);
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const { roles } = useSelector((state) => state.roles);
  const { permissions } = useSelector((state) => state.permissions);

  // Sort states
  const [sortBy, setSortBy] = useState({
    title: "",
    order: "",
  });

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target) &&
        !event.target.closest(".actions-menu")
      ) {
        setShowActions(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoadingUser(true);
    setAllUsers(users);
    setLoadingUser(false);
  }, [users]);

  useEffect(() => {
    sortUserList(allUsers);
  }, [sortBy]);

  const sortUserList = (users) => {
    if (sortBy.title === "") return;

    const sortedUsers = [...users].sort((a, b) => {
      const valA = a[sortBy.title === "Name" ? "name" : "email"];
      const valB = b[sortBy.title === "Name" ? "name" : "email"];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortBy.order === "asc" ? valA - valB : valB - valA;
      } else if (typeof valA === "string" && typeof valB === "string") {
        return sortBy.order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        errorToast("Invalid data type to sort");
        return 0;
      }
    });
    setAllUsers(sortedUsers);
  };

  const handleSearchTerm = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setAllUsers(users);
    } else {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAllUsers(filteredUsers);
    }
  };

  const handleChangeBlockStatus = (user) => {
    if (!isEditUserPermission(roles, permissions)) {
      errorToast("You don't have permission to modify user");
      return;
    }

    const newUser = { ...user, isBlocked: !user.isBlocked };

    dispatch(updateUser(newUser));
  };

  const handleDeleteUser = (user) => {
    if (!isDeleteUserPermission(roles, permissions)) {
      errorToast("You don't have permission to delete user");
      return;
    }

    setShowDeleteModal(user);
  };

  const handleClearSort = () => {
    setSortBy({
      title: "",
      order: "",
    });
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
    setAllUsers(users);
    sortUserList(users);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-auto">
      {addUser && <AddUser onClose={() => setAddUser(false)} />}
      {showRoles && (
        <UserRolesModal onClose={() => setShowRoles(false)} user={showRoles} />
      )}
      {showPermissions && (
        <UserPermissionsModal
          onClose={() => setShowPermissions(false)}
          user={showPermissions}
        />
      )}
      {showEditModal && (
        <EditUserModal
          onClose={() => setShowEditModal(null)}
          user={showEditModal}
        />
      )}
      {showDeleteModal && (
        <DeleteUserModal
          onClose={() => setShowDeleteModal(null)}
          user={showDeleteModal}
        />
      )}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <p className="text-primaryColor font-semibold">Permisio</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[250px]"
              placeholder="Search here..."
              onChange={handleSearchTerm}
            />
            <PlusCircle
              size={40}
              weight="fill"
              onClick={() => setAddUser(true)}
              className="cursor-pointer"
            />
            {(sortBy.title !== "" || searchTerm !== "") && (
              <div className="flex gap-4 items-center max-w-[400px] overflow-x-auto">
                <div className="flex gap-3 items-center">
                  {sortBy.title !== "" && (
                    <div className="p-2 bg-gray-200 rounded-full font-semibold flex gap-4">
                      <div className="flex gap-1 items-center">
                        <p className="text-sm text-gray-500 text-nowrap">
                          Sort By:
                        </p>
                        <p className="text-sm text-gray-500 text-nowrap">
                          {sortBy.title}
                        </p>
                      </div>

                      <div className="flex gap-1 items-center">
                        <p className="text-sm text-gray-500 text-nowrap">
                          Ordere By:
                        </p>
                        <p className="text-sm text-gray-500 text-nowrap">
                          {sortBy.order.toUpperCase()}
                        </p>
                      </div>
                      <p>
                        <XCircle
                          className="cursor-pointer"
                          size={20}
                          weight="fill"
                          onClick={handleClearSort}
                        />
                      </p>
                    </div>
                  )}
                  {searchTerm !== "" && (
                    <div className="p-2 pl-4 bg-gray-200 rounded-full flex gap-1">
                      <p className="text-sm text-gray-500 text-nowrap">
                        {searchTerm}
                      </p>
                      <p>
                        <XCircle
                          className="cursor-pointer"
                          size={20}
                          weight="fill"
                          onClick={handleClearSearchTerm}
                        />
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-4" />
        {!loadingUser ? (
          <div className="flex flex-col gap-5 h-full">
            {/* Table Header */}
            <div className="flex">
              {tableCol.map((col, idx) => (
                <div
                  key={idx}
                  style={{ width: col.width }}
                  className={`flex-shrink-0 font-semibold whitespace-nowrap text-ellipsis`}
                >
                  <div
                    className={`flex gap-1 items-center ${
                      col.isCenter ? "justify-center" : ""
                    }`}
                  >
                    <p>{col.title}</p>
                    {col.isSort && (
                      <div
                        onClick={() => {
                          if (sortBy.title === col.title) {
                            setSortBy({
                              title: col.title,
                              order: sortBy.order === "asc" ? "desc" : "asc",
                            });
                          } else {
                            setSortBy({
                              title: col.title,
                              order: "asc",
                            });
                          }
                        }}
                        className="p-1 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                      >
                        {col.title === sortBy.title ? (
                          <Funnel size={20} weight="fill" />
                        ) : (
                          <Funnel size={20} weight="bold" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Table Rows */}
            <div className="flex flex-col gap-6">
              {allUsers.length === 0 ? (
                <div className="w-full h-[50vh] flex items-center justify-center text-lg font-semibold">
                  No User Found.
                </div>
              ) : (
                allUsers.map((user, idx) => {
                  return (
                    <div key={user?.name + idx} className="flex items-center">
                      {tableCol.map((col, colIdx) => (
                        <div
                          key={colIdx}
                          className={`flex items-center flex-shrink-0 whitespace-nowrap text-ellipsis ${
                            col.isCenter ? "text-center" : ""
                          }`}
                          style={{ width: col.width }}
                        >
                          {/* Render content based on column */}
                          {colIdx === 0 && (
                            <div className="flex gap-1 items-center">
                              <div className="w-[30px] h-[30px] bg-gray-200 rounded-full" />
                              <p>{user.name}</p>
                            </div>
                          )}
                          {colIdx === 1 && <p>{user.email}</p>}
                          {colIdx === 2 && <p>{user.phoneNumber}</p>}
                          {colIdx === 3 && (
                            <div className="flex justify-center w-full">
                              <Eye
                                size={32}
                                weight="bold"
                                className="cursor-pointer"
                                onClick={() => setShowRoles(user)}
                              />
                            </div>
                          )}
                          {colIdx === 4 && (
                            <div className="flex justify-center w-full">
                              <Eye
                                size={32}
                                weight="bold"
                                className="cursor-pointer"
                                onClick={() => setShowPermissions(user)}
                              />
                            </div>
                          )}
                          {colIdx === 5 && (
                            <div className="w-full flex items-center justify-center">
                              <Switch
                                checked={user.isBlocked}
                                onChange={() => handleChangeBlockStatus(user)}
                              />
                            </div>
                          )}
                          {colIdx === 6 && (
                            <div className="w-full flex items-center justify-center">
                              <p>{user.isActive ? "Active" : "Inactive"}</p>
                            </div>
                          )}
                          {colIdx === 7 && (
                            <div
                              className="w-full flex itemce justify-center relative"
                              ref={actionsRef}
                            >
                              <div
                                onClick={() =>
                                  setShowActions(
                                    showActions === user?._id ? null : user?._id
                                  )
                                }
                                className="py-2 px-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                              >
                                <DotsThreeVertical size={25} weight="bold" />
                              </div>
                              {showActions === user._id && (
                                <div className="actions-menu absolute top-10  right-8 bg-gray-200 shadow-md p-1 rounded-lg z-30">
                                  <p
                                    onClick={() => {
                                      setShowEditModal(user);
                                      setShowActions(null);
                                    }}
                                    className="cursor-pointer py-2 px-6 hover:bg-gray-100 hover:shadow-md rounded-lg z-50"
                                  >
                                    Edit
                                  </p>
                                  <p
                                    onClick={() => {
                                      handleDeleteUser(user);
                                      setShowActions(null);
                                    }}
                                    className="cursor-pointer py-2 px-6 hover:bg-gray-100 hover:shadow-md rounded-lg"
                                  >
                                    Delete
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default Users;
