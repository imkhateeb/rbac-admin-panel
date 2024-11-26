import Modal from "./Modal";
import { XCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEditRolePermission } from "../utils/hasPermission";
import { errorToast, successToast } from "../utils/toasts";
import { updateRole } from "../redux/reducers/rolesReducers";

const RolePermissionsModal = ({ onClose, role }) => {
  const dispatch = useDispatch();
  const [rolePermissions, setRolePermissions] = useState([]);
  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  // Handle adding a new permission
  const handleAddPermission = (event) => {
    const permissionId = event.target.value;
    if (!permissionId) return;

    const newPermission = permissions.find((perm) => perm._id === permissionId);
    if (rolePermissions.some((perm) => perm._id === permissionId)) {
      errorToast("Permission already exists.");
      return;
    }

    setRolePermissions((prev) => [...prev, newPermission]);
  };

  const getPermissionsObject = (role) => {
    const permissionsObject = role?.permissions?.map((perm) => {
      return permissions.find((p) => p._id === perm);
    });

    setRolePermissions(permissionsObject);
  };

  // Handle removing a permission
  const handleRemovePermission = (id) => {
    setRolePermissions((prev) => prev.filter((perm) => perm._id !== id));
  };

  const handleSubmit = () => {
    if (finalPermissions.length === 0) {
      errorToast("Please select at least one permission.");
      return;
    }
    if (!isEditRolePermission(roles, permissions)) {
      errorToast("You do not have permission to modify a role.");
      onClose();
      return;
    }

    const finalPermissions = rolePermissions.map((perm) => perm._id);

    const newRole = { ...role, permissions: finalPermissions };

    dispatch(updateRole(newRole));
    successToast("Permission updated successfully.");
    onClose();
  };

  useEffect(() => {
    getPermissionsObject(role);
  }, []);

  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-5">
        <p className="text-lg font-semibold">{`${role?.roleName}'s Permission(s)`}</p>

        {/* Display existing permissions */}
        <div className="flex flex-wrap gap-3 w-[350px]">
          {rolePermissions.map((permission, idx) => (
            <div
              key={permission?._id}
              className="py-2 px-2 bg-gray-200 rounded-lg flex gap-2 items-center"
            >
              <p>{permission?.rule}</p>
              <XCircle
                size={25}
                weight="fill"
                className="cursor-pointer text-black"
                onClick={() => handleRemovePermission(permission._id)}
              />
            </div>
          ))}
        </div>

        {/* Add new permissions */}
        <div>
          <div className="flex flex-col">
            <p>Add Permission(s)</p>
            <select
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[350px] cursor-pointer"
              onChange={handleAddPermission}
            >
              <option value="">Select Permission(s)</option>
              {permissions.map((perm) => (
                <option key={perm._id} value={perm._id}>
                  {perm.rule}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex gap-3">
          <button
            type="button"
            className="w-1/2 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-linear"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-1/2 py-2 rounded-lg bg-black text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RolePermissionsModal;
