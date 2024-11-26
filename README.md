# **Permisio - A Role-Based Access Control (RBAC) UI**
![Screenshot 2024-11-26 203852](https://github.com/user-attachments/assets/b19aacad-2710-4164-8deb-a5305af3dcd8)

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
   - ![Screenshot 2024-11-26 201725](https://github.com/user-attachments/assets/90060ea8-82d6-4335-b8e3-f9a90e93e92d)


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
   - ![Screenshot 2024-11-26 201847](https://github.com/user-attachments/assets/94d0cc87-3c4e-48c6-8bc1-34db49639301)


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
   - ![Screenshot 2024-11-26 201923](https://github.com/user-attachments/assets/c602b29a-1f75-4091-b985-1aac47525e6b)


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
  const handleDeleteUser = (user) => {
    if (!isDeleteUserPermission(roles, permissions)) {
      errorToast("You don't have permission to delete user");
      return;
    }
    setShowDeleteModal(user);
  };
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
![Screenshot 2024-11-26 202121](https://github.com/user-attachments/assets/5a1bd23a-6b9b-4669-98a3-66de7ce9d431)

### **Role and Permission Management**
Roles and permissions are dynamically fetched and used to validate actions:
- **Roles:** Contain collections of permissions.
- **Custom Permissions:** Allow granular control for users.
---

## **Setup and Installation**

### **Steps to Run Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/imkhateeb/rbac-admin-panel
   ```
2. Navigate to the project directory:
   ```bash
   cd rbac-admin-panel/client
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
   http://localhost:5173
   ```

### **Environment**
No external backend server is required. All data is simulated using local storage.

---

## **Screenshots**

1. **User Management Dashboard**
   ![Screenshot 2024-11-26 202952](https://github.com/user-attachments/assets/06747217-4499-45c1-a1ea-299c456b4b52)
   ![Screenshot 2024-11-26 202934](https://github.com/user-attachments/assets/32258d0b-0665-4a1a-87be-e50bcfeeabeb)
   ![Screenshot 2024-11-26 203146](https://github.com/user-attachments/assets/2f4a1adb-29ac-4989-9b56-f65c4a05df62)
   ![Screenshot 2024-11-26 203219](https://github.com/user-attachments/assets/0f020a9d-0c29-4146-9399-875d905e5efc)
   ![Screenshot 2024-11-26 203256](https://github.com/user-attachments/assets/21703816-3849-4ace-88ed-38e7d6b98204)
   ![Screenshot 2024-11-26 203336](https://github.com/user-attachments/assets/e8c9173b-8e2d-470e-9720-4dc846b4be0d)
   
4. **Role Management Dashboard**
   ![Screenshot 2024-11-26 203419](https://github.com/user-attachments/assets/e815fda9-a719-4048-96f4-730ca802fe8f)
   ![Screenshot 2024-11-26 203457](https://github.com/user-attachments/assets/41276f6b-4fad-4f54-8390-9e228912b4ad)
   ![Screenshot 2024-11-26 203712](https://github.com/user-attachments/assets/2b2d9a28-f851-4a48-a3e2-505f493bc610)
   ![Screenshot 2024-11-26 203811](https://github.com/user-attachments/assets/fe946383-6f96-49c5-af07-8bcfbf81e4aa)

5. **Permission Management Dashboard**
   ![Screenshot 2024-11-26 204059](https://github.com/user-attachments/assets/b9ecb47b-adea-4fe3-b7de-73770cb39210)
   ![Screenshot 2024-11-26 204155](https://github.com/user-attachments/assets/54408512-da16-45e5-8610-f1d1dbfabf79)
   ![Screenshot 2024-11-26 204305](https://github.com/user-attachments/assets/8854e434-7876-4638-9614-ecf094f8686a)
   ![Screenshot 2024-11-26 204344](https://github.com/user-attachments/assets/3cb78056-8da4-45c3-a204-95f354b8490a)

7. **Permission Succeeded/Denied Example**
   ![Screenshot 2024-11-26 204502](https://github.com/user-attachments/assets/bde462bf-6d20-4acc-858f-ef70b666e6c6)
   ![Screenshot 2024-11-26 203115](https://github.com/user-attachments/assets/ec692b42-2e2c-4ffc-bf1d-e39351f8d0d1)

---

## **How It Works**

1. **Login Simulation**
   - A test admin user is automatically logged in when the application starts.
   - Roles and custom permissions of the admin are dynamically fetched and stored.
   - You can add more custom permissions and roles to the admin.
   - If needed add a new permission.
        - Add it to admin's custome permissions
        - Or assign that permission to a role and then assign that role to the admin.

2. **Access Control**
   - All actions on users, roles, and permissions are validated using the admin's assigned permissions and roles.

3. **CRUD Operations**
   - Simulated using state management library Redux Toolkit and local storage.

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
