import { XCircle } from "@phosphor-icons/react";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/reducers/usersReducers";
import { errorToast, successToast } from "../utils/toasts";
import { isAddUserPermission } from "../utils/hasPermission";

const AddUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);
  const { users } = useSelector((state) => state.users);

  const hadleSubmit = () => {
    // Add validdations
    if (!firstName || !lastName || !email || !phone) {
      errorToast("Please fill all the fields");
      return;
    }
    const newUser = {
      name: firstName + " " + lastName,
      email,
      phoneNumber: `+${phone}`,
      isDeleted: false,
      isBlocked: false,
      isActive: true,
      profilePicture: "https://example.com/profiles/alan_turing.jpg",
      lastLogin: "2024-11-22T12:30:10.654Z",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (!isAddUserPermission(roles, permissions)) {
      errorToast("You do not have permission to add a user.");
      onClose();
      return;
    }

    for (let user of users) {
      if (user.email === email) {
        errorToast("User with this email already exists");
        return;
      }
    }

    dispatch(addUser(newUser));
    successToast("User added successfully");
    onClose();
  };
  return (
    <Modal>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4 max-h-[75vh] overflow-x-auto">
        <p className="text-lg font-semibold">Add User</p>
        {/* 1st Row */}
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <p>First Name</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="First name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Last Name</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Last name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* 2nd row */}
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col">
            <p>Email</p>
            <input
              type="email"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Phone</p>
            <input
              type="text"
              className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[300px]"
              placeholder="Enter Phone..."
              value={phone}
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  return;
                }
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        {/* 4th Row - Permissions */}
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
            onClick={hadleSubmit}
            className="bg-black rounded-lg py-2 px-4 cursor-pointer text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUser;
