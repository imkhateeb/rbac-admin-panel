import { useEffect, useState } from "react";
import { XCircle } from "@phosphor-icons/react";
import { successToast } from "../utils/toasts";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [user, setUser] = useState(null);
  const { roles } = useSelector((state) => state.roles);
  const { permissions } = useSelector((state) => state.permissions);

  const setCurrentUser = () => {
    const user = {
      _id: "648b72b5d22e4c01b6a2f999",
      name: "Example Admin",
      email: "example.user@example.com",
      roles: ["648b72b5d22e4c01b6a2f101"],
      customPermissions: [
        "648b72b5d22e4c01b6a2f201",
        "648b72b5d22e4c01b6a2f202",
      ],
      createdAt: "2024-11-24T14:30:00.000Z",
      updatedAt: "2024-11-24T14:30:00.000Z",
      lastLogin: "2024-11-24T14:30:00.000Z",
      profilePicture: "https://example.com/profiles/admin_user.jpg",
      phoneNumber: "+1234567890",
      isDeleted: false,
      isActive: true,
      isBlocked: false,
    };
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const extractRolesAndPermissions = (user) => {
    const userRoles = roles.filter((role) => user.roles.includes(role._id));
    const userPermissions = permissions.filter((permission) =>
      user.customPermissions.includes(permission._id)
    );
    setUserRoles(userRoles);
    setUserPermissions(userPermissions);
  };

  const handleAddRoles = (e) => {
    const roleId = e.target.value;
    if (!roleId) return;

    if (!user.roles.includes(roleId)) {
      const updatedRoles = [...user.roles, roleId];
      setUser({ ...user, roles: updatedRoles });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, roles: updatedRoles })
      );

      const newRole = roles.find((role) => role._id === roleId);
      setUserRoles([...userRoles, newRole]);
      successToast("Role added successfully");
    }
  };

  const handleRemoveRole = (roleId) => {
    const updatedRoles = user.roles.filter((id) => id !== roleId);
    setUser({ ...user, roles: updatedRoles });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...user, roles: updatedRoles })
    );

    const filteredRoles = userRoles.filter((role) => role._id !== roleId);
    setUserRoles(filteredRoles);
    successToast("Role removed successfully");
  };

  const handleAddPermission = (e) => {
    const permissionId = e.target.value;
    if (!permissionId) return;

    if (!user.customPermissions.includes(permissionId)) {
      const updatedPermissions = [...user.customPermissions, permissionId];
      setUser({ ...user, customPermissions: updatedPermissions });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, customPermissions: updatedPermissions })
      );

      const newPermission = permissions.find(
        (permission) => permission._id === permissionId
      );
      setUserPermissions([...userPermissions, newPermission]);

      successToast("Permission added successfully");
    }
  };

  const handleRemovePermission = (permissionId) => {
    const updatedPermissions = user.customPermissions.filter(
      (id) => id !== permissionId
    );
    setUser({ ...user, customPermissions: updatedPermissions });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...user, customPermissions: updatedPermissions })
    );

    const filteredPermissions = userPermissions.filter(
      (permission) => permission._id !== permissionId
    );
    setUserPermissions(filteredPermissions);
    successToast("Permission removed successfully");
  };

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      setCurrentUser();
    }
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      extractRolesAndPermissions(user);
    }
  }, [user]);

  return (
    <div className="flex flex-col p-4 max-sm:p-2 w-full h-full gap-5 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 italic">
          {` - This is dummy profile for testing purpose, from here you can change
          your access controls and test which actions you can perform or which
          can't.`}
        </p>
        <p className="text-gray-500 italic">
          - You can change your roles and permissions for performing operations.
        </p>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-full" />
          <p className="text-center text-lg font-semibold">{user?.name}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Basic Details</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="w-[80px]">Email</p>
            <p>:</p>
            <p>{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[80px]">Phone</p>
            <p>:</p>
            <p>{user?.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Permission details */}
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Roles</p>
        <div className="flex flex-col gap-2">
          {/* Roles */}
          <div className="flex gap-2 w-full max-sm:flex-col">
            <div className="w-1/2 max-sm:w-full overflow-x-auto flex gap-2 rounded-lg">
              {userRoles?.map((role) => (
                <div
                  key={role._id}
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
            <div className="w-1/2 max-sm:w-full flex gap-2">
              <select
                onChange={handleAddRoles}
                className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[350px] max-md:w-full cursor-pointer"
              >
                <option value="">Select Role(s)</option>
                {roles
                  .filter((role) => !userRoles.some((r) => r._id === role._id))
                  .map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.roleName}: {role.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <p className="text-lg font-semibold mt-4">Custom Permissions</p>
          {/* Permission */}
          <div className="flex gap-2 w-full max-sm:flex-col">
            <div className="w-1/2 max-sm:w-full overflow-x-auto flex gap-2 rounded-lg">
              {userPermissions?.map((permission) => (
                <div
                  key={permission._id}
                  className="py-2 px-2 bg-gray-200 rounded-lg flex gap-2 items-center"
                >
                  <p>{permission?.rule}</p>
                  <XCircle
                    size={25}
                    weight="fill"
                    className="cursor-pointer"
                    onClick={() => handleRemovePermission(permission._id)}
                  />
                </div>
              ))}
            </div>
            <div className="w-1/2 max-sm:w-full flex gap-2">
              <select
                onChange={handleAddPermission}
                className="border-[1px] border-gray-300 py-2 px-3 rounded-lg w-[350px] max-md:w-full cursor-pointer"
              >
                <option value="">Select Permission(s)</option>
                {permissions
                  .filter(
                    (permission) =>
                      !userPermissions.some((p) => p._id === permission._id)
                  )
                  .map((permission) => (
                    <option key={permission._id} value={permission._id}>
                      {permission.rule}: {permission.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
