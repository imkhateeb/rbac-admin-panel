const users = [
  {
    _id: "648b72b5d22e4c01b6a2f001",
    name: "John Doe",
    email: "john.doe@example.com",
    roles: ["648b72b5d22e4c01b6a2f101"],
    customPermissions: ["648b72b5d22e4c01b6a2f206"],
    createdAt: "2024-01-12T09:45:23.123Z",
    updatedAt: "2024-10-01T14:32:12.456Z",
    lastLogin: "2024-11-15T12:10:30.789Z",
    profilePicture: "https://example.com/profiles/john_doe.jpg",
    phoneNumber: "+1234567890",
    isDeleted: false,
    isActive: true,
    isBlocked: false,
  },
  {
    _id: "648b72b5d22e4c01b6a2f002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    roles: ["648b72b5d22e4c01b6a2f102"],
    customPermissions: ["648b72b5d22e4c01b6a2f205"],
    createdAt: "2023-08-15T11:22:33.987Z",
    updatedAt: "2024-09-10T15:43:21.654Z",
    lastLogin: "2024-11-14T09:55:10.234Z",
    profilePicture: "https://example.com/profiles/jane_smith.jpg",
    phoneNumber: "+1987654321",
    isDeleted: false,
    isActive: false,
    isBlocked: false,
  },
  {
    _id: "648b72b5d22e4c01b6a2f011",
    name: "Isaac Newton",
    email: "isaac.newton@example.com",
    roles: ["648b72b5d22e4c01b6a2f103"],
    customPermissions: ["648b72b5d22e4c01b6a2f209"],
    createdAt: "2024-10-15T08:30:45.123Z",
    updatedAt: "2024-11-10T12:45:30.567Z",
    lastLogin: "2024-11-20T09:30:15.432Z",
    profilePicture: "https://example.com/profiles/isaac_newton.jpg",
    phoneNumber: "+1234567001",
    isDeleted: false,
    isActive: true,
    isBlocked: false,
  },
  {
    _id: "648b72b5d22e4c01b6a2f012",
    name: "Marie Curie",
    email: "marie.curie@example.com",
    roles: ["648b72b5d22e4c01b6a2f104"],
    customPermissions: ["648b72b5d22e4c01b6a2f206"],
    createdAt: "2024-10-18T06:15:50.890Z",
    updatedAt: "2024-11-15T10:25:30.543Z",
    lastLogin: "2024-11-21T15:50:45.678Z",
    profilePicture: "https://example.com/profiles/marie_curie.jpg",
    phoneNumber: "+9876543210",
    isDeleted: false,
    isActive: true,
    isBlocked: false,
  },
  {
    _id: "648b72b5d22e4c01b6a2f013",
    name: "Nikola Tesla",
    email: "nikola.tesla@example.com",
    roles: ["648b72b5d22e4c01b6a2f102"],
    customPermissions: [
      "648b72b5d22e4c01b6a2f206",
      "648b72b5d22e4c01b6a2f207",
      "648b72b5d22e4c01b6a2f208",
    ],
    createdAt: "2024-09-05T11:45:20.987Z",
    updatedAt: "2024-10-22T18:10:40.123Z",
    lastLogin: "2024-11-19T14:10:25.789Z",
    profilePicture: "https://example.com/profiles/nikola_tesla.jpg",
    phoneNumber: "+1987654320",
    isDeleted: false,
    isActive: true,
    isBlocked: false,
  },
  {
    _id: "648b72b5d22e4c01b6a2f014",
    name: "Ada Lovelace",
    email: "ada.lovelace@example.com",
    roles: ["648b72b5d22e4c01b6a2f103"],
    customPermissions: ["648b72b5d22e4c01b6a2f209"],
    createdAt: "2024-08-15T12:10:30.789Z",
    updatedAt: "2024-11-17T08:45:20.432Z",
    lastLogin: "2024-11-18T10:30:15.123Z",
    profilePicture: "https://example.com/profiles/ada_lovelace.jpg",
    phoneNumber: "+1234567899",
    isDeleted: false,
    isActive: true,
    isBlocked: false,
  },
  {
    _id: "648b72b5d22e4c01b6a2f015",
    name: "Alan Turing",
    email: "alan.turing@example.com",
    roles: ["648b72b5d22e4c01b6a2f101"],
    customPermissions: [
      "648b72b5d22e4c01b6a2f201",
      "648b72b5d22e4c01b6a2f202",
      "648b72b5d22e4c01b6a2f203",
      "648b72b5d22e4c01b6a2f204",
      "648b72b5d22e4c01b6a2f205",
    ],
    createdAt: "2024-10-25T10:45:23.456Z",
    updatedAt: "2024-11-21T15:20:45.543Z",
    lastLogin: "2024-11-22T12:30:10.654Z",
    profilePicture: "https://example.com/profiles/alan_turing.jpg",
    phoneNumber: "+1432109876",
    isDeleted: false,
    isActive: true,
    isBlocked: false,
  },
];

const permissions = [
  {
    _id: "648b72b5d22e4c01b6a2f201",
    rule: "delete_admin",
    isActive: true,
    description: "Allows deleting admin users.",
    createdAt: "2024-11-01T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f202",
    rule: "add_admin",
    isActive: true,
    description: "Allows adding admin users.",
    createdAt: "2024-11-02T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f203",
    rule: "modify_admin",
    isActive: true,
    description: "Allows modifying admin details.",
    createdAt: "2024-11-03T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f204",
    rule: "add_permission",
    isActive: true,
    description: "Allows adding new permissions.",
    createdAt: "2024-11-04T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f205",
    rule: "delete_permission",
    isActive: true,
    description: "Allows deleting existing permissions.",
    createdAt: "2024-11-05T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f206",
    rule: "view_reports",
    isActive: true,
    description: "Allows viewing system reports.",
    createdAt: "2024-11-06T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f207",
    rule: "delete_user",
    isActive: true,
    description: "Allows deleting general users.",
    createdAt: "2024-11-07T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f208",
    rule: "add_user",
    isActive: true,
    description: "Allows adding general users.",
    createdAt: "2024-11-08T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f209",
    rule: "update_profile",
    isActive: true,
    description: "Allows updating user profile details.",
    createdAt: "2024-11-09T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f210",
    rule: "manage_settings",
    isActive: true,
    description: "Allows managing system settings.",
    createdAt: "2024-11-10T10:00:00.000Z",
  },
];

const roles = [
  {
    _id: "648b72b5d22e4c01b6a2f101",
    roleName: "Admin",
    description: "Full access to all resources.",
    isActive: true,
    isDeleted: false,
    permissions: [
      "648b72b5d22e4c01b6a2f201",
      "648b72b5d22e4c01b6a2f202",
      "648b72b5d22e4c01b6a2f203",
      "648b72b5d22e4c01b6a2f204",
      "648b72b5d22e4c01b6a2f205",
    ],
    createdAt: "2023-01-01T10:00:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f102",
    roleName: "Manager",
    description: "Manage users and content.",
    isActive: true,
    isDeleted: false,
    permissions: [
      "648b72b5d22e4c01b6a2f206",
      "648b72b5d22e4c01b6a2f207",
      "648b72b5d22e4c01b6a2f208",
    ],
    createdAt: "2023-06-15T11:30:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f103",
    roleName: "User",
    description: "Limited access to personal resources.",
    isActive: true,
    isDeleted: false,
    permissions: ["648b72b5d22e4c01b6a2f209"],
    createdAt: "2024-03-20T09:45:00.000Z",
  },
  {
    _id: "648b72b5d22e4c01b6a2f104",
    roleName: "Viewer",
    description: "View-only access.",
    isActive: true,
    isDeleted: false,
    permissions: ["648b72b5d22e4c01b6a2f206"],
    createdAt: "2023-12-10T08:20:00.000Z",
  },
];

export { users, permissions, roles };