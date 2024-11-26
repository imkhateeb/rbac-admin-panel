import { useEffect, useRef, useState } from "react";
import { Switch } from "antd";
import {
  DotsThreeVertical,
  PlusCircle,
  Funnel,
  XCircle,
} from "@phosphor-icons/react";
import AddPermission from "../components/AddPermission";
import EditPermissionModal from "../components/EditPermissionModal";
import DeletePermissionModal from "../components/DeletePermissionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  isDeleteRulePermission,
  isEditRulePermission,
} from "../utils/hasPermission";
import { errorToast, successToast } from "../utils/toasts";
import { updatePermission } from "../redux/reducers/permissionsReducers";

const tableCol = [
  { title: "Rule", width: "200px", isSort: true, isCenter: false },
  { title: "Description", width: "400px", isSort: false, isCenter: false },
  { title: "Created At", width: "150px", isSort: true, isCenter: false },
  { title: "Status", width: "150px", isSort: false, isCenter: true },
  { title: "Actions", width: "100px", isSort: false, isCenter: true },
];

const Permissions = () => {
  const dispatch = useDispatch();
  const actionRef = useRef(null);
  const [allRules, setAllRules] = useState([]);
  const [loadingRule, setLoadingRule] = useState(false);
  const [addRule, setAddRule] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [deletePermission, setDeletePermission] = useState(null);
  const [editPermission, setEditPermission] = useState(null);
  const [sortBy, setSortBy] = useState({ title: "", order: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  useEffect(() => {
    setAllRules(permissions);
  }, [permissions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target) &&
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
    handleSort(allRules);
  }, [sortBy]);

  const handleSort = (rules) => {
    if (sortBy.title === "") {
      return;
    }
    const sortedRules = [...rules].sort((a, b) => {
      if (sortBy.order === "asc") {
        return a[sortBy.title === "Rule" ? "rule" : "createdAt"] >
          b[sortBy.title === "Rule" ? "rule" : "createdAt"]
          ? 1
          : -1;
      } else {
        return a[sortBy.title === "Rule" ? "rule" : "createdAt"] <
          b[sortBy.title]
          ? 1
          : -1;
      }
    });
    setAllRules(sortedRules);
  };

  const handleDeletePermission = (permission) => {
    if (!isDeleteRulePermission(roles, permissions)) {
      errorToast("You do not have permission to delete a permission.");
      return;
    }

    setDeletePermission(permission);
  };

  const handleChangeStatus = (permission) => {
    if (!isEditRulePermission(roles, permissions)) {
      errorToast("You do not have permission to modify a permission.");
      return;
    }

    const newPermission = { ...permission, isActive: !permission.isActive };

    dispatch(updatePermission(newPermission));
    if (newPermission.isActive) {
      successToast("Activated successfully.");
    } else {
      successToast("Deactivated successfully.");
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setAllRules(permissions);
      return;
    }

    const filteredRules = permissions.filter(
      (rule) =>
        rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAllRules(filteredRules);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
    setAllRules(permissions);
    handleSort(permissions);
  };
  const handleClearSort = () => {
    setSortBy({ title: "", order: "" });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-auto">
      {addRule && <AddPermission onClose={() => setAddRule(false)} />}
      {editPermission && (
        <EditPermissionModal
          onClose={() => setEditPermission(null)}
          permission={editPermission}
        />
      )}
      {deletePermission && (
        <DeletePermissionModal
          onClose={() => setDeletePermission(null)}
          permission={deletePermission}
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
              onClick={() => setAddRule(true)}
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
                          Order By:
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
        {!loadingRule ? (
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
              {allRules.length === 0 ? (
                <div className="w-full h-[50vh] flex items-center justify-center text-lg font-semibold">
                  No Permission Found.
                </div>
              ) : (
                allRules.map((rule, idx) => {
                  return (
                    <div key={rule?.rule + idx} className="flex items-center">
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
                              <p>{rule.rule}</p>
                            </div>
                          )}
                          {colIdx === 1 && <p>{rule.description}</p>}
                          {colIdx === 2 && (
                            <p>{rule.createdAt?.split("T")[0]}</p>
                          )}
                          {colIdx === 3 && (
                            <div className="w-full flex items-center justify-center">
                              <Switch
                                checked={rule?.isActive || false}
                                onChange={() => handleChangeStatus(rule)}
                              />
                            </div>
                          )}
                          {colIdx === 4 && (
                            <div
                              ref={actionRef}
                              className="w-full flex itemce justify-center relative"
                            >
                              <div
                                onClick={() => setShowActions(rule?._id)}
                                className="py-2 px-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                              >
                                <DotsThreeVertical size={25} weight="bold" />
                              </div>
                              {showActions === rule?._id && (
                                <div className="actions-menu absolute top-10  right-8 bg-gray-200 shadow-md p-1 rounded-lg z-30">
                                  <p
                                    onClick={() => {
                                      setEditPermission(rule);
                                      setShowActions(null);
                                    }}
                                    className="cursor-pointer py-2 px-6 hover:bg-gray-100 hover:shadow-md rounded-lg z-50"
                                  >
                                    Edit
                                  </p>
                                  <p
                                    onClick={() => {
                                      handleDeletePermission(rule);
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

export default Permissions;
