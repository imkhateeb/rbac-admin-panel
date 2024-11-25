import { useEffect, useState } from "react";
import Modal from "./Modal";
import { XCircle } from "@phosphor-icons/react";

import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import { isEditUserPermission } from "../utils/hasPermission";
import { updateUser } from "../redux/reducers/usersReducers";

const UserPermissionsModal = ({ onClose, user }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const handleExtractPermissions = (user) => {
    const existingPermissions = user?.customPermissions?.map((permissionId) => {
      return permissions.find((permission) => permission?._id === permissionId);
    });
    setUserPermissions(existingPermissions);

    const remainingPermissions = permissions.filter(
      (permission) => !user?.customPermissions?.includes(permission._id)
    );
    setAvailablePermissions(remainingPermissions);
  };

  const handleAddPermission = (permissionId) => {
    if (!permissionId) return;
    const permissionToAdd = permissions.find(
      (permission) => permission._id === permissionId
    );

    setUserPermissions((prev) => [...prev, permissionToAdd]);
    setAvailablePermissions((prev) =>
      prev.filter((permission) => permission._id !== permissionId)
    );

    document.querySelector("select").value = "";
  };

  const handleRemoveRole = (permissionId) => {
    const permissionToRemove = permissions.find(
      (permission) => permission._id === permissionId
    );

    setUserPermissions((prev) =>
      prev.filter((permission) => permission._id !== permissionId)
    );
    setAvailablePermissions((prev) => [...prev, permissionToRemove]);
  };

  const handleSubmit = () => {
    if (userPermissions.length === 0) {
      errorToast("Please select at least one permission");
      return;
    }
    if (!isEditUserPermission(roles, permissions)) {
      errorToast("You do not have permission to edit user roles");
      return;
    }

    const permissionIds = userPermissions.map((permission) => permission._id);
    const updatedUser = { ...user, customPermissions: permissionIds };

    dispatch(updateUser(updatedUser));
    successToast("User permissions updated successfully");
    onClose();
  };

  useEffect(() => {
    if (user) {
      handleExtractPermissions(user);
    }
  }, [user]);

  const hasChanges =
    JSON.stringify(user?.customPermissions) !==
    JSON.stringify(userPermissions.map((p) => p._id));

  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-5">
        <p className="text-lg font-semibold">{`${user?.name}'s Permission(s)`}</p>

        <div className="flex flex-wrap gap-3 w-[350px]">
          {userPermissions?.map((permission, idx) => (
            <div
              key={permission?._id}
              className="py-2 px-2 bg-gray-200 rounded-lg flex gap-2 items-center"
            >
              <p>{permission?.rule}</p>
              <XCircle
                size={25}
                weight="fill"
                className="cursor-pointer"
                onClick={() => handleRemoveRole(permission?._id)}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="flex flex-col">
            <p>Permission(s)</p>
            <select
              onChange={(e) => handleAddPermission(e.target.value)}
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[350px] cursor-pointer"
            >
              <option value="">Select Permission(s)</option>
              {availablePermissions.map((permission) => (
                <option key={permission._id} value={permission._id}>
                  {permission.rule}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            className="w-1/2 py-2 rounded-lg bg-black text-white disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={!hasChanges}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserPermissionsModal;
