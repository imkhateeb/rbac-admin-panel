import Modal from "./Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePermission } from "../redux/reducers/permissionsReducers";
import { errorToast, successToast } from "../utils/toasts";
import { isEditRulePermission } from "../utils/hasPermission";

const EditPermissionModal = ({ onClose, permission }) => {
  const dispatch = useDispatch();
  const [rule, setRule] = useState(permission?.rule || "");
  const [description, setDescription] = useState(permission?.description || "");

  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  const handleSubmit = () => {
    if (!rule || !description) {
      errorToast("Please fill all the fields");
      return;
    }

    if (!isEditRulePermission(roles, permissions)) {
      errorToast("You do not have permission to edit a permission.");
      onClose();
      return;
    }

    const newPermission = { ...permission, rule, description };

    dispatch(updatePermission(newPermission));
    successToast("Permission updated successfully.");
    onClose();
  };

  if (!permission) return null;
  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <p className="text-lg font-semibold">Add Rule</p>
        {/* 1st Row */}
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <p>Rule</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Rule..."
              value={rule}
              onChange={(e) => setRule(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Description</p>
            <textarea
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default EditPermissionModal;
