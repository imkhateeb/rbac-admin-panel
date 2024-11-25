import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { useState } from "react";
import { errorToast, successToast } from "../utils/toasts";
import { isEditRolePermission } from "../utils/hasPermission";
import { updateRole } from "../redux/reducers/rolesReducers";

const EditRoleModal = ({ onClose, role }) => {
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState(role?.roleName || "");
  const [roleDescription, setRoleDescription] = useState(
    role?.description || ""
  );

  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  const handleSubmit = () => {
    if (!roleName || !roleDescription) {
      errorToast("Please fill all the fields");
      return;
    }

    if (!isEditRolePermission(roles, permissions)) {
      errorToast("You do not have permission to edit a role.");
      onClose();
      return;
    }

    const newRole = { ...role, roleName, description: roleDescription };

    dispatch(updateRole(newRole));
    successToast("Permission updated successfully.");
    onClose();
  };

  if (!role) return null;
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
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Role..."
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Description</p>
            <textarea
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Description..."
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </div>
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
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditRoleModal;
