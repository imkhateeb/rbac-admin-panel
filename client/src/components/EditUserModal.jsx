import Modal from "./Modal";
import { useState } from "react";
import { errorToast, successToast } from "../utils/toasts";
import { isEditUserPermission } from "../utils/hasPermission";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/reducers/usersReducers";

const EditUserModal = ({ onClose, user }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [userPhone, setUserPhone] = useState(user?.phoneNumber || "");
  const [userStatus, setUserStatus] = useState(user?.isActive || false);
  const dispatch = useDispatch();

  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  const handleSave = () => {
    if (!userName || !userEmail || !userPhone) {
      errorToast("Please fill all the fields");
      return;
    }

    if (!isEditUserPermission(roles, permissions)) {
      errorToast("You don't have permission to modify user");
      return;
    }

    const newUserData = {
      ...user,
      name: userName,
      email: userEmail,
      phoneNumber: userPhone,
      isActive: userStatus,
    };

    dispatch(updateUser(newUserData));
    successToast("User updated successfully");
    onClose();
  };

  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4 max-h-[75vh] overflow-x-auto">
        <p className="text-lg font-semibold">Edit User</p>
        {/* 1st Row */}
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <p>Name</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Email</p>
            <input
              type="email"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Email..."
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Phone</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Phone..."
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col ">
            <p>Status</p>
            <div className="w-full flex justify-center gap-4">
              <button
                type="button"
                className={`cursor-pointer ${
                  userStatus
                    ? "bg-black rounded-lg text-white py-1.5 px-4"
                    : "bg-gray-100 rounded-lg py-1.5 px-4 hover:bg-gray-200"
                }`}
                onClick={() => setUserStatus(true)}
              >
                Active
              </button>
              <button
                type="button"
                className={`cursor-pointer ${
                  !userStatus
                    ? "bg-black rounded-lg text-white py-1.5 px-4"
                    : "bg-gray-100 rounded-lg py-1.5 px-4 hover:bg-gray-200"
                }`}
                onClick={() => setUserStatus(false)}
              >
                Inctive
              </button>
            </div>
          </div>
        </div>

        {/* 2nd row */}
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            type="button"
            className="bg-gray-100 rounded-lg hover:bg-gray-200 py-2 px-4 cursor-pointer w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-black w-1/2 rounded-lg py-2 px-4 cursor-pointer text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
