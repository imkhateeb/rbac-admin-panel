# **Permisio - A Role-Based Access Control (RBAC) UI**

## **Project Overview**

This project is a Role-Based Access Control (RBAC) dashboard built using **React**, **TailwindCSS**, and **Redux**. The purpose of this project is to simulate an admin panel where users, roles, and permissions can be managed efficiently while enforcing access control rules based on assigned permissions.

The project demonstrates key RBAC features such as user management, role management, and dynamic permission assignment. It also includes functionality to simulate different permissions for an admin user saved in the local storage.

---

## **Features**

### **User Management**
- View all users in a table format.
- Add, edit, or delete users.
- Block or deactivate a user.
- Assign or remove roles from a user.
- Add or delete custom permissions for a user.
- Filter, search (by name and email), and sort (by name and email) users.

### **Role Management**
- View, add, edit, or delete roles.
- Assign or remove permissions associated with roles.
- Activate or deactivate a role.
- Search(by role name and description)
- Sort(by role name, time of creation)

### **Permission Management**
- View, add, edit, or delete permissions.
- Sort, Search and filter permissions.

### **Dynamic Access Control**
- Simulate the admin user with assigned roles and custom permissions.
- Validate actions based on assigned permissions.
- Prevent unauthorized actions for users without the necessary permissions.

---

## **Tech Stack**
- **Frontend Framework:** React
- **State Management:** Redux
- **Styling:** TailwindCSS and vanilla CSS
- **Data Storage:** Local Storage (to simulate data persistence)
- **Languages:** JavaScript

---

## **Project Structure**

### **Entities**
1. **Users**
   - Example Fields:
     ```json
     {
        "_id": "648b72b5d22e4c01b6a2f015",
        "name": "Alan Turing",
        "email": "alan.turing@example.com",
        "roles": ["648b72b5d22e4c01b6a2f101"],
        "customPermissions": [
          "648b72b5d22e4c01b6a2f201",
          "648b72b5d22e4c01b6a2f202",
          "648b72b5d22e4c01b6a2f203",
          "648b72b5d22e4c01b6a2f204",
          "648b72b5d22e4c01b6a2f205"
        ],
        "createdAt": "2024-10-25T10:45:23.456Z",
        "updatedAt": "2024-11-21T15:20:45.543Z",
        "lastLogin": "2024-11-22T12:30:10.654Z",
        "profilePicture": "https://example.com/profiles/alan_turing.jpg",
        "phoneNumber": "+1432109876",
        "isDeleted": false,
        "isActive": true,
        "isBlocked": false
     }
     ```
   - Actions: Add, Edit, Delete, Block, Assign Roles, Assign Permissions.

2. **Roles**
   - Example Fields:
     ```json
     {
        "_id": "648b72b5d22e4c01b6a2f101",
        "roleName": "Admin",
        "description": "Full access to all resources.",
        "isActive": true,
        "isDeleted": false,
        "permissions": [
          "648b72b5d22e4c01b6a2f201",
          "648b72b5d22e4c01b6a2f202",
          "648b72b5d22e4c01b6a2f203",
          "648b72b5d22e4c01b6a2f204",
          "648b72b5d22e4c01b6a2f205"
        ],
        "createdAt": "2023-01-01T10:00:00.000Z"
     }
     ```
   - Actions: Add, Edit, Delete, Assign Permissions.

3. **Permissions**
   - Example Fields:
     ```json
     {
       "_id": "648b72b5d22e4c01b6a2f202",
        "rule": "add_admin",
        "isActive": true,
        "description": "Allows adding admin users.",
        "createdAt": "2024-11-02T10:00:00.000Z"
     }
     ```
   - Actions: Add, Edit, Delete.

---

## **Functionality Highlights**

### **Permission Validation**
The following functions ensure that users have the necessary permissions to perform specific actions:

```javascript
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
```

Example Usage:
```javascript
if (isAddUserPermission(allRoles, allPermissions)) {
  // Allow adding a user
} else {
  // Deny access
}
```

### **Mock Admin User**
A test admin user is initialized in local storage to simulate the functionalities:
```json
{
  "_id": "648b72b5d22e4c01b6a2f999",
  "name": "Example Admin",
  "email": "example.user@example.com",
  "roles": ["648b72b5d22e4c01b6a2f101"],
  "customPermissions": [
    "648b72b5d22e4c01b6a2f201",
    "648b72b5d22e4c01b6a2f202"
  ],
  "createdAt": "2024-11-24T14:30:00.000Z",
  "updatedAt": "2024-11-24T14:30:00.000Z",
  "lastLogin": "2024-11-24T14:30:00.000Z",
  "profilePicture": "https://example.com/profiles/admin_user.jpg",
  "phoneNumber": "+1234567890",
  "isDeleted": false,
  "isActive": true,
  "isBlocked": false
}
```

### **Role and Permission Management**
Roles and permissions are dynamically fetched and used to validate actions:
- **Roles:** Contain collections of permissions.
- **Custom Permissions:** Allow granular control for users.
---

## **Setup and Installation**

### **Steps to Run Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rbac-dashboard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd rbac-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### **Environment**
No external backend server is required. All data is simulated using local storage.

---

## **Screenshots**
<!-- Add screenshots for the following views -->

1. **User Management Dashboard**
   ![User Management](#)
   
2. **Role Management Dashboard**
   ![Role Management](#)

3. **Permission Management Dashboard**
   ![Permission Management](#)

4. **Permission Denied Example**
   ![Permission Denied](#)

---

## **How It Works**

1. **Login Simulation**
   - A test admin user is automatically logged in when the application starts.
   - Roles and permissions of the admin are dynamically fetched and stored.

2. **Access Control**
   - All actions on users, roles, and permissions are validated using the admin's assigned permissions.

3. **CRUD Operations**
   - Simulated using React state and local storage.

4. **Validation**
   - Prevent unauthorized actions by validating permissions before executing functions.

---

## **Future Improvements**
- Integrate with a real backend API for dynamic data persistence.
- Add authentication and session management.
- Include advanced features like audit logs and activity tracking.
- Implement real-time updates using WebSockets.
---

## **Contributing**
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.
