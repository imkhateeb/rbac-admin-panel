import Modal from "./Modal";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPermission } from "../redux/reducers/permissionsReducers";
import { isAddRulePermission } from "../utils/hasPermission";
import { errorToast, successToast } from "../utils/toasts";

const AddPermission = ({ onClose }) => {
  const dispatch = useDispatch();
  const permissionRef = useRef(null);
  const descriptionRef = useRef(null);

  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  const handleSubmit = () => {
    if (!isAddRulePermission(roles, permissions)) {
      errorToast("You do not have permission to add a permission.");
      onClose();
      return;
    }
    const ruleValue = permissionRef.current?.value.trim();
    const descriptionValue = descriptionRef.current?.value.trim();

    if (!ruleValue || !descriptionValue) {
      errorToast("Please fill in both fields before saving.");
      return;
    }

    const data = {
      rule: ruleValue,
      description: descriptionValue,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    dispatch(addPermission(data));
    successToast("Permission added successfully.");
    onClose();
  };

  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <p className="text-lg font-semibold">Add Permission</p>
        {/* Input Fields */}
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <label htmlFor="permissionInput" className="font-medium">
              Permission
            </label>
            <input
              id="permissionInput"
              type="text"
              ref={permissionRef}
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Rule..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="descriptionInput" className="font-medium">
              Description
            </label>
            <textarea
              id="descriptionInput"
              ref={descriptionRef}
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Description..."
            />
          </div>
        </div>
        {/* Action Buttons */}
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

export default AddPermission;
