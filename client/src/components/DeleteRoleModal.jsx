import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { deleteRole } from "../redux/reducers/rolesReducers";
import { successToast } from "../utils/toasts";

const DeleteRoleModal = ({ onClose, role }) => {
  const dispatch = useDispatch();

  const handleDeleteRole = () => {
    dispatch(deleteRole(role._id));
    successToast("Role deleted successfully.");
    onClose();
  };
  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <p className="text-lg font-semibold">{`Delete ${role?.roleName} Role`}</p>
        <p className="text-gray-500 text-center">
          Are you sure you want to delete this user?
        </p>
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
            onClick={handleDeleteRole}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRoleModal;
