import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { useState } from "react";
import { XCircle } from "@phosphor-icons/react";
import { errorToast, successToast } from "../utils/toasts";
import { addRole } from "../redux/reducers/rolesReducers";
import { isAddRolePermission } from "../utils/hasPermission";

const AddRole = ({ onClose }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRules, setSelectedRules] = useState([]);
  const { permissions } = useSelector((state) => state.permissions);

  const { roles } = useSelector((state) => state.roles);

  const handleAddPermission = (e) => {
    const permissionId = e.target.value;
    if (!permissionId) {
      errorToast("Please select a permission");
      return;
    }

    if (!selectedRules.some((p) => p._id === permissionId)) {
      const newPermission = permissions.find(
        (permission) => permission._id === permissionId
      );
      setSelectedRules([...selectedRules, newPermission]);
    }
  };

  const handleRemovePermission = (permissionId) => {
    const updatedPermissions = selectedRules.filter(
      (permission) => permission._id !== permissionId
    );
    setSelectedRules(updatedPermissions);
  };

  const handleSave = () => {
    if (!role.trim()) {
      errorToast("Role is required.");
      return;
    }
    if (!description.trim()) {
      errorToast("Description is required.");
      return;
    }
    if (selectedRules.length === 0) {
      errorToast("Please add at least one permission.");
      return;
    }

    if (!isAddRolePermission(roles, permissions)) {
      errorToast("You do not have permission to add a role.");
      onClose();
      return;
    }

    for (let item of roles) {
      if (role?.toLowerCase() === item.roleName?.toLowerCase()) {
        errorToast("Role with this name already exists.");
        return;
      }
    }

    const newRole = {
      roleName: role,
      description,
      isActive: true,
      isDeleted: false,
      permissions: selectedRules.map((permission) => permission._id),
      createdAt: new Date().toISOString(),
    };
    dispatch(addRole(newRole));
    successToast("Role added successfully");
    onClose();
  };

  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <p className="text-lg font-semibold">Add Role</p>
        {/* 1st Row */}
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <p>Role</p>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Role..."
            />
          </div>
          <div className="flex flex-col">
            <p>Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Description..."
            />
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <p>Permission(s)</p>
            <select
              onChange={handleAddPermission}
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px] cursor-pointer"
            >
              <option value="">Select Permission(s)</option>
              {permissions
                .filter(
                  (permission) =>
                    !selectedRules.some((p) => p._id === permission._id)
                )
                .map((permission) => (
                  <option key={permission._id} value={permission._id}>
                    {permission.rule}: {permission.description}
                  </option>
                ))}
            </select>
          </div>
          {selectedRules?.length ? (
            <div className="flex flex-col">
              <p>Selected Permission(s)</p>
              {/* Selected Rows */}
              <div className="rounded-lg w-[300px] overflow-x-auto flex gap-3">
                {selectedRules.map((permission) => (
                  <div
                    key={permission._id}
                    className="bg-gray-200 p-2 rounded-lg flex gap-1 items-center"
                  >
                    <p className="pl-1">{permission.rule}</p>
                    <XCircle
                      size={25}
                      weight="fill"
                      className="cursor-pointer"
                      onClick={() => handleRemovePermission(permission._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            type="button"
            className="bg-gray-100 rounded-lg hover:bg-gray-200 py-2 px-4 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-black rounded-lg py-2 px-4 cursor-pointer text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRole;
