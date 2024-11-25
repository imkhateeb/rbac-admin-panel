/**
 * Get the user's permissions from roles and custom permissions.
 * @param {Array} allRoles - List of all roles.
 * @returns {Array} - Array of permission IDs for the current user.
 */
const getUserPermissions = (allRoles) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // Get user roles based on their IDs
  const userRoles = allRoles.filter((role) =>
    currentUser.roles.includes(role._id)
  );

  // Combine permissions from roles and custom permissions
  const userPermissions = new Set([
    ...currentUser.customPermissions,
    ...userRoles.flatMap((role) => role.permissions),
  ]);

  const userPermissionsArray = Array.from(userPermissions);

  return userPermissionsArray;
};

/**
 * Check if the user has a specific permission by rule name.
 * @param {Array} allRoles - List of all roles.
 * @param {Array} allPermissions - List of all permissions.
 * @param {string} rule - The rule name of the permission to check.
 * @returns {boolean} - True if the user has the permission, false otherwise.
 */
const hasPermission = (allRoles, allPermissions, rule) => {
  const userPermissions = getUserPermissions(allRoles);

  // Find the permission by rule name
  const permission = allPermissions.find((perm) => perm.rule === rule);

  return permission ? userPermissions.includes(permission._id) : false;
};

/**
 * Check if the user has a specific role-based permission by role name.
 * @param {Array} allRoles - List of all roles.
 * @param {string} roleName - The name of the role to check.
 * @returns {boolean} - True if the user has the role, false otherwise.
 */

// Specific Permission Checks
const isAddRulePermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "add_permission");

const isEditRulePermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "modify_permission");

const isDeleteRulePermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "delete_permission");

const isAddRolePermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "add_role");

const isEditRolePermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "modify_role");

const isDeleteRolePermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "delete_role");

const isAddUserPermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "add_user");

const isEditUserPermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "modify_user");

const isDeleteUserPermission = (allRoles, allPermissions) =>
  hasPermission(allRoles, allPermissions, "delete_user");

// Exporting all functions
export {
  isAddRulePermission,
  isEditRulePermission,
  isDeleteRulePermission,
  isAddRolePermission,
  isEditRolePermission,
  isDeleteRolePermission,
  isAddUserPermission,
  isEditUserPermission,
  isDeleteUserPermission,
};
