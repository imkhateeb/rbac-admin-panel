import { useEffect, useState } from "react";
import Modal from "./Modal";
import { XCircle } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import { isEditUserPermission } from "../utils/hasPermission";
import { updateUser } from "../redux/reducers/usersReducers";

const UserRolesModal = ({ onClose, user }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
  const { permissions } = useSelector((state) => state.permissions);

  // Extract roles assigned to the user
  const handleExtractRoles = (user) => {
    const userAssignedRoles = user.roles.map((roleId) => {
      return roles.find((role) => role._id === roleId);
    });
    setUserRoles(userAssignedRoles);

    const remainingRoles = roles.filter(
      (role) => !user.roles.includes(role._id)
    );
    setAvailableRoles(remainingRoles);
  };

  // Handle adding a role to the user
  const handleAddRole = (roleId) => {
    if (!roleId) return;
    const roleToAdd = roles.find((role) => role._id === roleId);

    setUserRoles((prev) => [...prev, roleToAdd]);
    setAvailableRoles((prev) => prev.filter((role) => role._id !== roleId));
    setSelectedRole("");
  };

  // Handle removing a role from the user
  const handleRemoveRole = (roleId) => {
    const roleToRemove = roles.find((role) => role._id === roleId);

    setUserRoles((prev) => prev.filter((role) => role._id !== roleId));
    setAvailableRoles((prev) => [...prev, roleToRemove]);
  };

  // Submit changes
  const handleSubmit = () => {
    if (userRoles.length === 0) {
      errorToast("Please select at least one role");
      return;
    }
    if (!isEditUserPermission(roles, permissions)) {
      errorToast("You do not have permission to modify user");
      return;
    }

    const roleIds = userRoles.map((role) => role._id);
    const updatedUser = { ...user, roles: roleIds };
    dispatch(updateUser(updatedUser));
    successToast("User roles updated successfully");
    onClose();
  };

  useEffect(() => {
    if (user) {
      handleExtractRoles(user);
    }
  }, [user, roles]);

  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-5">
        <p className="text-lg font-semibold">{`${user?.name}'s Role(s)`}</p>

        <div className="flex flex-wrap gap-3 w-[350px]">
          {userRoles?.map((role) => (
            <div
              key={role?._id}
              className="py-2 px-2 bg-gray-200 rounded-lg flex gap-2 items-center"
            >
              <p>{role?.roleName}</p>
              <XCircle
                size={25}
                weight="fill"
                className="cursor-pointer"
                onClick={() => handleRemoveRole(role._id)}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="flex flex-col">
            <p>Role(s)</p>
            <select
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[350px] cursor-pointer"
              value={selectedRole}
              onChange={(e) => handleAddRole(e.target.value)}
            >
              <option value="">Select Role(s)</option>
              {availableRoles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.roleName}
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

export default UserRolesModal;
