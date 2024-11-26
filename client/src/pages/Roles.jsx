import { useEffect, useRef, useState } from "react";
import { Switch } from "antd";
import {
  DotsThreeVertical,
  Eye,
  PlusCircle,
  Funnel,
  XCircle,
} from "@phosphor-icons/react";
import AddRole from "../components/AddRole";
import EditRoleModal from "../components/EditRoleModal";
import DeleteRoleModal from "../components/DeleteRoleModal";
import RolePermissionsModal from "../components/RolePermissionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  isDeleteRolePermission,
  isEditRolePermission,
} from "../utils/hasPermission";
import { errorToast, successToast } from "../utils/toasts";
import { updateRole } from "../redux/reducers/rolesReducers";

const tableCol = [
  { title: "Role", width: "200px", isSort: true, isCenter: false },
  { title: "Description", width: "400px", isSort: false, isCenter: false },
  { title: "Permission(s)", width: "150px", isSort: false, isCenter: true },
  { title: "Created At", width: "150px", isSort: true, isCenter: false },
  { title: "Status", width: "150px", isSort: false, isCenter: true },
  { title: "Actions", width: "100px", isSort: false, isCenter: true },
];

const Roles = () => {
  const [allRoles, setAllRoles] = useState([]);
  const [loadingRole, setLoadingRole] = useState(false);
  const [addRole, setAddrole] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [deleteRole, setDeleteRole] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [showPermissions, setShowPermissions] = useState(null);
  const dispatch = useDispatch();
  const actionsRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState({
    title: "",
    order: "",
  });

  const { roles } = useSelector((state) => state.roles);
  const { permissions } = useSelector((state) => state.permissions);

  useEffect(() => {
    setAllRoles(roles);
  }, [roles]);

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
    handleSort(allRoles);
  }, [sortBy]);

  const handleDeleteRole = (role) => {
    if (!isDeleteRolePermission(roles, permissions)) {
      errorToast("You do not have permission to delete a role.");
      return;
    }

    setDeleteRole(role);
  };

  const handleChangeStatus = (role) => {
    if (!isEditRolePermission(roles, permissions)) {
      errorToast("You do not have permission to modify a role.");
      return;
    }

    const newPermission = { ...role, isActive: !role.isActive };

    dispatch(updateRole(newPermission));
    if (newPermission.isActive) {
      successToast("Activated successfully.");
    } else {
      successToast("Deactivated successfully.");
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setAllRoles(roles);
      return;
    }
    const filteredRoles = roles.filter(
      (role) =>
        role.roleName.toLowerCase().includes(searchTerm) ||
        role.description.toLowerCase().includes(searchTerm)
    );
    setAllRoles(filteredRoles);
  };

  const handleSort = (roles) => {
    if (sortBy.title === "") {
      return;
    }
    const sortedRoles = [...roles].sort((a, b) => {
      if (sortBy.order === "asc") {
        return a[sortBy.title === "Role" ? "roleName" : "createdAt"] >
          b[sortBy.title === "Role" ? "roleName" : "createdAt"]
          ? 1
          : -1;
      } else {
        return a[sortBy.title === "Role" ? "roleName" : "Created At"] <
          b[sortBy.title]
          ? 1
          : -1;
      }
    });
    setAllRoles(sortedRoles);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
    setAllRoles(roles);
    handleSort(roles);
  };
  const handleClearSort = () => {
    setSortBy({
      title: "",
      order: "",
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-auto">
      {addRole && <AddRole onClose={() => setAddrole(false)} />}
      {editRole && (
        <EditRoleModal onClose={() => setEditRole(null)} role={editRole} />
      )}
      {deleteRole && (
        <DeleteRoleModal
          onClose={() => setDeleteRole(null)}
          role={deleteRole}
        />
      )}
      {showPermissions && (
        <RolePermissionsModal
          onClose={() => setShowPermissions(null)}
          role={showPermissions}
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
              onClick={() => setAddrole(true)}
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
        {!loadingRole ? (
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
                      col.isCenter ? "items-center justify-center" : ""
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
              {allRoles.length === 0 ? (
                <div className="w-full h-[50vh] flex items-center justify-center text-lg font-semibold">
                  No Role Found.
                </div>
              ) : (
                allRoles.map((role, idx) => {
                  return (
                    <div
                      key={role?.roleName + idx}
                      className="flex items-center"
                    >
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
                              <p>{role.roleName}</p>
                            </div>
                          )}
                          {colIdx === 1 && <p>{role.description}</p>}
                          {colIdx === 2 && (
                            <div className="flex justify-center w-full">
                              <Eye
                                size={32}
                                weight="bold"
                                className="cursor-pointer"
                                onClick={() => setShowPermissions(role)}
                              />
                            </div>
                          )}

                          {colIdx === 3 && (
                            <p>{role.createdAt?.split("T")[0]}</p>
                          )}
                          {colIdx === 4 && (
                            <div className="w-full flex items-center justify-center">
                              <Switch
                                checked={role?.isActive || false}
                                onChange={() => handleChangeStatus(role)}
                              />
                            </div>
                          )}
                          {colIdx === 5 && (
                            <div
                              ref={actionsRef}
                              className="w-full flex itemce justify-center relative"
                            >
                              <div
                                onClick={() => setShowActions(role?._id)}
                                className="py-2 px-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                              >
                                <DotsThreeVertical size={25} weight="bold" />
                              </div>
                              {showActions === role?._id && (
                                <div className="actions-menu absolute top-10  right-8 bg-gray-200 shadow-md p-1 rounded-lg z-30">
                                  <p
                                    onClick={() => {
                                      setEditRole(role);
                                      setShowActions(null);
                                    }}
                                    className="cursor-pointer py-2 px-6 hover:bg-gray-100 hover:shadow-md rounded-lg z-50"
                                  >
                                    Edit
                                  </p>
                                  <p
                                    onClick={() => {
                                      handleDeleteRole(role);
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

export default Roles;
