import React from "react";
import { ChartLineUp, Folder } from "@phosphor-icons/react";

const adminNavigations = [
  {
    title: "Profile",
    icon: React.createElement(ChartLineUp, { size: 30, weight: "bold" }),
    activeIcon: React.createElement(ChartLineUp, { size: 30, weight: "fill" }),
    to: "/admin/",
  },
  {
    title: "Users",
    icon: React.createElement(Folder, { size: 32, weight: "bold" }),
    activeIcon: React.createElement(Folder, { size: 32, weight: "fill" }),
    to: "/admin/users",
  },
  {
    title: "Roles",
    icon: React.createElement(Folder, { size: 32, weight: "bold" }),
    activeIcon: React.createElement(Folder, { size: 32, weight: "fill" }),
    to: "/admin/roles",
  },
  {
    title: "Permissions",
    icon: React.createElement(Folder, { size: 32, weight: "bold" }),
    activeIcon: React.createElement(Folder, { size: 32, weight: "fill" }),
    to: "/admin/permissions",
  },
];

export default adminNavigations;
