import { useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Welcome",
    id: 1,
  },
  {
    title: "How to use?",
    id: 2,
  },
  {
    title: "New Permission",
    id: 3,
  },
];

const requiredPermissions = [
  {
    title: "add_user",
    desc: "Permission to add a new user",
    id: 1,
  },
  {
    title: "modify_user",
    desc: "Permission to edit, add new role, add new permissions, activate/deactivate, block/unblock an existing user",
    id: 2,
  },
  {
    title: "delete_user",
    desc: "Permission to delete a user",
    id: 3,
  },
  {
    title: "add_role",
    desc: "Permission to add a new role",
    id: 4,
  },
  {
    title: "modify_role",
    desc: "Permission to edit, activate/deactivate amd add new permissions an existing role",
    id: 5,
  },
  {
    title: "delete_role",
    desc: "Permission to delete a role",
    id: 6,
  },
  {
    title: "add_permission",
    desc: "Permission to add a new permission",
    id: 7,
  },
  {
    title: "modify_permission",
    desc: "Permission to modify, activate/deactivate an existing permission",
    id: 8,
  },
  {
    title: "delete_permission",
    desc: "Permission to delete a permission",
    id: 9,
  },
];

const keyFeatures = [
  {
    title: "User Management",
    bullets: [
      "Create, view, update, and delete user profiles.",
      "Track user activity, including last login and account status.",
      "Add detailed user information such as contact details, profile pictures, and more.",
    ],
  },
  {
    title: "Role Management",
    bullets: [
      "Define roles with specific permissions for different organizational needs.",
      "Assign roles to users dynamically, allowing hierarchical access.",
    ],
  },
  {
    title: "Permission Management",
    bullets: [
      "Create and manage granular custom permissions for users.",
      "Enable or restrict specific actions like adding admins, accessing confidential resources, and more.",
    ],
  },
  {
    title: "Security and status flags",
    bullets: [
      "Monitor account statuses with indicators like isActive, isBlocked, and isDeleted.",
      "Ensure robust control over access with role and permission-based authorization.",
    ],
  },
];

const Guide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="w-full h-full bg-white rounded-3xl flex gap-2">
      <div className="flex flex-col p-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-2 cursor-pointer rounded-lg font-semibold w-[150px] ${
              currentStep === step.id ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            {step.title}
          </div>
        ))}
      </div>
      <div className="p-4 w-full h-[87vh] overflow-y-auto">
        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Welcome to the guide</h1>
            <p className="text-gray-500">
              This website is a User and Role Management System designed to
              streamline user access control, permissions, and roles for
              organizations of all sizes. It provides a scalable and intuitive
              platform for managing users, roles, and custom permissions
              effectively, ensuring secure and organized workflows.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Key Features</p>
              {keyFeatures.map((feature) => (
                <div key={feature.title} className="p-2 bg-gray-100 rounded-lg">
                  <h1 className="text-lg font-semibold">{feature.title}</h1>
                  <ul className="list-disc list-inside">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              onClick={() => setCurrentStep(2)}
              className="font-semibold underline cursor-pointer"
            >
              See how to use it?
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">How to use?</h1>
            <div className="p-2 bg-gray-100 rounded-lg flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                Go through test user profile
              </h1>
              <p className="text-gray-500">
                This dummy user will have some permissions and roles already
                assigned. By this you can see how the system works.
              </p>
              <Link
                to={"/admin"}
                className="font-semibold underline cursor-pointer"
              >
                Checkout Test Profile.
              </Link>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                Try features with test user
              </h1>
              <div className="flex flex-col gap-1 p-2">
                <p className="text-lg font-semibold">User features</p>
                <div className="px-2">
                  <p> - Add new user.</p>
                  <p> - Edit existing user.</p>
                  <p> - Block/Unblock a user.</p>
                  <p> - Assign new roles to user.</p>
                  <p> - Assign new custom permissions to user.</p>
                  <p> - Delete a user.</p>
                  <p> - Search using name and email.</p>
                  <p> - Sort on the basis of name and email.</p>
                  <Link
                    to={"/admin/users"}
                    className="font-semibold underline cursor-pointer"
                  >
                    Checkout User Features.
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-1 p-2">
                <p className="text-lg font-semibold">Role features</p>
                <div className="px-2">
                  <p> - Add new role.</p>
                  <p> - Delete a role.</p>
                  <p> - Edit existing role.</p>
                  <p> - Activate/Deactivate a role.</p>
                  <p> - Assign new permissions to role.</p>
                  <p> - Search role using name and description.</p>
                  <p> - Sort on the basis of name and Created At.</p>
                  <Link
                    to={"/admin/roles"}
                    className="font-semibold underline cursor-pointer"
                  >
                    Checkout Role Features.
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-1 p-2">
                <p className="text-lg font-semibold">Permission features</p>
                <div className="px-2">
                  <p> - Add new permission.</p>
                  <p> - Delete a permission.</p>
                  <p> - Edit existing permission.</p>
                  <p> - Activate/Deactivate a permission.</p>
                  <p> - Search permission using name and description.</p>
                  <p> - Sort permission on the basis of name and Created At.</p>
                  <Link
                    to={"/admin/roles"}
                    className="font-semibold underline cursor-pointer"
                  >
                    Checkout Permission Features.
                  </Link>
                </div>
              </div>
            </div>

            <div className="px-2 py-4 flex flex-col">
              <p className="text-lg font-semibold">
                Not having enought permissions?
              </p>
              <p
                onClick={() => setCurrentStep(3)}
                className="font-semibold underline cursor-pointer"
              >
                Checkout New Permission.
              </p>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold">New Permission</h1>
            <div>
              <p className="text-gray-500">
                If we do not have a permission to perform some features then
                follow these steps.
              </p>

              <div className="flex flex-col gap-4">
                <div className="p-2 flex flex-col gap-2">
                  <p className="text-lg font-semibold">
                    Step-1 - Add a new permission.
                  </p>
                  <div className="px-2 flex flex-col gap-1">
                    <p>
                      - <b>add_permission</b> permission is already given to
                      current user so that you can add any permission.
                    </p>
                    <p>
                      {" "}
                      - Select a feature from the right side that you want to
                      perform.
                    </p>
                    <p> - Select the permission.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-[300px] p-4 h-[87vh] overflow-y-auto">
        {currentStep === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">
              Required permission to perform features.
            </p>
            <div className="flex flex-col gap-2">
              {requiredPermissions.map((permission) => (
                <div key={permission.id} className="p-2 bg-gray-100 rounded-lg">
                  <h1 className="text-lg font-semibold">{permission.title}</h1>
                  <p className="text-gray-500">{permission.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guide;
