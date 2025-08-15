import React from "react";
import "../assets/CSS/Sidebar.css";
// Using emojis for colorful icons
import { FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { label: "Invoices", icon: "🧾", active: false },
  { label: "Customers", icon: "🧑‍🤝‍🧑", active: false },
  { label: "My Business", icon: "🏢", active: false },
  { label: "Invoice Journal", icon: "📖", active: false },
  { label: "Price List", icon: "🏷️", active: true },
  { label: "Multiple Invoicing", icon: "📄", active: false },
  { label: "Unpaid Invoices", icon: "❗", active: false },
  { label: "Offer", icon: "🎁", active: false },
  { label: "Inventory Control", icon: "📦", active: false, disabled: true },
  { label: "Member Invoicing", icon: "👥", active: false, disabled: true },
  { label: "Import/Export", icon: "☁️", active: false },
  {
    label: "Log out",
    icon: <FaSignOutAlt style={{ color: "#ff512f" }} />,
    active: false,
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="menu-title">Menu</h2>
      <div className="menu-underline" />
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${item.disabled ? "disabled" : ""}`}
          >
            {item.active && <span className="green-dot" />}
            <span className="icon" style={{ fontSize: 16 }}>
              {item.icon}
            </span>
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
